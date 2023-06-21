import { createCookieSessionStorage } from "@remix-run/cloudflare";

import type { Env } from "../env";
import type { SessionData, SessionStorage } from "@remix-run/cloudflare";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export class ThemeService {
  themes: Array<Theme> = Object.values(Theme);
  themeStorage: SessionStorage<SessionData, SessionData>;

  constructor(env: Env) {
    this.themeStorage = createCookieSessionStorage({
      cookie: {
        name: "hashnode.theme",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secrets: [env.COOKIE_SESSION_SECRET],
      },
    });
  }

  isTheme(value: unknown): value is Theme {
    return typeof value === "string" && this.themes.includes(value as Theme);
  }

  async getTheme(request: Request) {
    const session = await this.themeStorage.getSession(
      request.headers.get("Cookie")
    );
    const themeValue = session.get("theme");
    return this.isTheme(themeValue) ? themeValue : Theme.DARK;
  }

  async setTheme(request: Request, theme: Theme) {
    const session = await this.themeStorage.getSession(
      request.headers.get("Cookie")
    );
    session.set("theme", theme);
  }

  async commit(request: Request) {
    const session = await this.themeStorage.getSession(
      request.headers.get("Cookie")
    );
    // expires in 1 year
    const expires = new Date(Date.now() + 31536000000);
    return this.themeStorage.commitSession(session, { expires: expires });
  }
}
