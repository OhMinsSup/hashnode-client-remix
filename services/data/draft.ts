import { z } from "zod";
import {
  SessionIdStorageStrategy,
  createCookieSessionStorage,
} from "@remix-run/cloudflare";
import { createTypedSessionStorage } from "remix-utils";

import type { Env } from "../env";
import type { TypedSessionStorage, TypedSession } from "remix-utils";

const SessionSchema = z.object({
  draftId: z.union([z.string(), z.number()]).nullish().optional(),
  userId: z.number(),
});

export type Session = z.infer<typeof SessionSchema>;

export interface IDraftService {
  readonly sessionStorage: TypedSessionStorage<typeof SessionSchema>;
}

export class DraftService implements IDraftService {
  #sessionStorage: TypedSessionStorage<typeof SessionSchema>;

  constructor(env: Env) {
    let sessionStorage = createCookieSessionStorage({
      cookie: {
        name: "hashnode.draftId",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secrets: [env.COOKIE_SESSION_SECRET],
      },
    });

    this.#sessionStorage = createTypedSessionStorage({
      sessionStorage,
      schema: SessionSchema,
    });
  }

  async getSession(request: Request) {
    return this.sessionStorage.getSession(request.headers.get("Cookie"));
  }

  async getId(session: TypedSession<typeof SessionSchema>) {
    return session.get("draftId");
  }

  async setId(
    session: TypedSession<typeof SessionSchema>,
    id: string | number
  ) {
    session.set("draftId", id);
    return session;
  }

  async removeId(session: TypedSession<typeof SessionSchema>) {
    if (session.has("draftId")) {
      session.unset("draftId");
    }
    return session;
  }

  async commit(session: TypedSession<typeof SessionSchema>) {
    return this.sessionStorage.commitSession(session, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
  }

  get sessionStorage() {
    return this.#sessionStorage;
  }
}
