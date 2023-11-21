import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { schema } from "../validate/toast.validate";

import type { Env } from "./env.server";
import type { SessionStorage } from "@remix-run/cloudflare";
import type { OptionalToast } from "../validate/toast.validate";

export class ToastService {
  toastSessionStorage: SessionStorage<any, any>;

  cookieName = "hashnode.toast";

  toastKey = "toast";

  constructor(private readonly env: Env) {
    this.toastSessionStorage = createCookieSessionStorage({
      cookie: {
        name: this.cookieName,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [env.TOAST_SECRET],
      },
    });
  }

  createToastHeaders = async (optionalToast: OptionalToast) => {
    const session = await this.toastSessionStorage.getSession();
    const toast = schema.parse(optionalToast);
    session.flash(this.toastKey, toast);
    const cookie = await this.toastSessionStorage.commitSession(session);
    return new Headers({ "set-cookie": cookie });
  };

  getToast = async (request: Request) => {
    const session = await this.toastSessionStorage.getSession(
      request.headers.get("cookie")
    );
    const result = schema.safeParse(session.get(this.toastKey));
    const toast = result.success ? result.data : null;
    return {
      toast,
      headers: toast
        ? new Headers({
            "set-cookie":
              await this.toastSessionStorage.destroySession(session),
          })
        : null,
    };
  };
}
