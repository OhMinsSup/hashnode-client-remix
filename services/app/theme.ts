import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Theme, isTheme } from "~/context/useThemeContext";

import type { Env } from "../env";
import type {
  Session,
  SessionData,
  SessionStorage,
} from "@remix-run/cloudflare";

export class ThemeService {
  themeName = "hashnode.theme";
  themeStorage: SessionStorage<SessionData, SessionData>;

  constructor(env: Env) {
    this.themeStorage = createCookieSessionStorage({
      cookie: {
        name: this.themeName,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secrets: [env.COOKIE_SESSION_SECRET],
      },
    });
  }

  async getTheme(request: Request) {
    const session = await this.themeStorage.getSession(
      request.headers.get("Cookie")
    );
    const themeValue = session.get("theme");
    return isTheme(themeValue) ? themeValue : Theme.LIGHT;
  }

  async setTheme(request: Request, theme: Theme) {
    const session = await this.themeStorage.getSession(
      request.headers.get("Cookie")
    );
    session.set("theme", theme);
    return session;
  }

  async commit(request: Request, session?: Session<SessionData, SessionData>) {
    const _session =
      session ??
      (await this.themeStorage.getSession(request.headers.get("Cookie")));

    // expires in 1 year
    const expires = new Date(Date.now() + 31536000000);
    return this.themeStorage.commitSession(_session, { expires: expires });
  }
}
