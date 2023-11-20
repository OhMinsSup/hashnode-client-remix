import { createCookie } from "@remix-run/cloudflare";
import { CSRF, CSRFError } from "remix-utils/csrf/server";

import type { Env } from "./env.server";
import type { Cookie } from "@remix-run/cloudflare";

export class CsrfService {
  cookie: Cookie;
  csrf: CSRF;

  cookieName = "hashnode.csrf";
  csrfName = "csrf";

  constructor(env: Env) {
    this.cookie = createCookie(this.cookieName, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secrets: [env.COOKIE_SESSION_SECRET],
    });

    this.csrf = new CSRF({
      cookie: this.cookie,
      // what key in FormData objects will be used for the token, defaults to `csrf`
      formDataKey: this.csrfName,
      // an optional secret used to sign the token, recommended for extra safety
      secret: env.CSRF_SECRET,
    });
  }

  async validateCSRF(formData: FormData, headers: Headers) {
    try {
      await this.csrf.validate(formData, headers);
    } catch (error) {
      if (error instanceof CSRFError) {
        throw new Response("Invalid CSRF token", { status: 403 });
      }
      throw error;
    }
  }
}
