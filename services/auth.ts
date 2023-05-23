import { z } from "zod";
import { FormStrategy } from "./strategy/form";
import { signinSchema } from "~/api/auth/validation/signin";
import { createWorkersKVSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { createTypedSessionStorage } from "remix-utils";

import type { Env } from "./env";
import type { TypedSessionStorage } from "remix-utils";
import { signinApi } from "~/api/auth/signin.server";
import { RESULT_CODE } from "~/constants/constant";
import { getMeApi } from "~/api/user/me.server";
import { HTTPError } from "~/api/client.next";

const UserProfileSchema = z.object({
  name: z.string(),
  tagline: z.string().nullish().optional(),
  avatarUrl: z.string().nullish().optional(),
  location: z.string().nullish().optional(),
  bio: z.string().nullish().optional(),
  availableText: z.string().nullish().optional(),
});

const UserSocialSchema = z.object({
  github: z.string().nullish().optional(),
  twitter: z.string().nullish().optional(),
  facebook: z.string().nullish().optional(),
  instagram: z.string().nullish().optional(),
  website: z.string().nullish().optional(),
});

const UserSkillSchema = z.array(z.object({ id: z.number(), name: z.string() }));

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  profile: UserProfileSchema,
  skills: UserSkillSchema,
  socials: UserSocialSchema,
  createdAt: z.number(),
  accessToken: z.string(),
});

const SessionSchema = z.object({
  user: UserSchema.optional(),
  strategy: z.string().optional(),
  "oauth2:state": z.string().uuid().optional(),
  "auth:error": z.object({ message: z.string() }).optional(),
});

export type User = z.infer<typeof UserSchema>;

export type Session = z.infer<typeof SessionSchema>;

export interface IAuthService {
  readonly authenticator: Authenticator<User>;
  readonly sessionStorage: TypedSessionStorage<typeof SessionSchema>;
}

export class AuthService implements IAuthService {
  #sessionStorage: TypedSessionStorage<typeof SessionSchema>;
  #authenticator: Authenticator<User>;

  constructor(kv: KVNamespace, env: Env) {
    let sessionStorage = createWorkersKVSessionStorage({
      cookie: {
        name: "sid",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secrets: [env.COOKIE_SESSION_SECRET],
      },
      kv,
    });

    this.#sessionStorage = createTypedSessionStorage({
      sessionStorage,
      schema: SessionSchema,
    });

    // @ts-expect-error
    this.#authenticator = new Authenticator<User>(this.#sessionStorage, {
      throwOnError: true,
    });

    // Tell the Authenticator to use the form strategy
    this.#authenticator.use(
      new FormStrategy(async ({ form }) => {
        const body = {
          email: form.get("email"),
          password: form.get("password"),
        };

        const parse = await signinSchema.parseAsync(body);
        console.log("parse", parse);
        const { json: signin_resp, header } = await signinApi(parse);
        console.log("signin_resp", signin_resp);
        const { json: me_resp } = await getMeApi({
          init: {
            headers: header,
          },
        });
        console.log("me_resp", me_resp);
        // the type of this user must match the type you pass to the Authenticator
        // the strategy will automatically inherit the type if you instantiate
        // directly inside the `use` method
        return Object.assign(me_resp.result, {
          accessToken: signin_resp.result?.accessToken,
        }) as User;
      }),
      // each strategy has a name and can be changed to use another one
      // same strategy multiple times, especially useful for the OAuth2 strategy.
      "@authenticators/form"
    );
  }

  get authenticator() {
    return this.#authenticator;
  }

  get sessionStorage() {
    return this.#sessionStorage;
  }
}
