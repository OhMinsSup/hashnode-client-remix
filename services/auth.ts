import { z } from "zod";
import { createWorkersKVSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { createTypedSessionStorage } from "remix-utils";

import type { Env } from "./env";
import type { TypedSessionStorage } from "remix-utils";

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

const UserSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
    username: z.string(),
    profile: UserProfileSchema,
    skills: UserSkillSchema,
    socials: UserSocialSchema,
    createdAt: z.string(),
  })
  .nullish();

const SessionSchema = z.object({
  user: UserSchema.optional(),
  strategy: z.string().optional(),
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
        maxAge: 4233600, // 1 week
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
  }

  get authenticator() {
    return this.#authenticator;
  }

  get sessionStorage() {
    return this.#sessionStorage;
  }
}
