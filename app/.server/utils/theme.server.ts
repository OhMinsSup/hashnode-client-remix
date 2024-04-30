import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Theme, isTheme } from "~/context/useThemeContext";
import type {
  Session,
  SessionData,
  SessionStorage,
} from "@remix-run/cloudflare";

const NAME = "hashnode.theme";

let themeStorage: SessionStorage<SessionData, SessionData>;

export function initializeTheme(cookieSecret: string) {
  if (themeStorage) {
    return themeStorage;
  }
  themeStorage = createCookieSessionStorage({
    cookie: {
      name: NAME,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secrets: [cookieSecret],
    },
  });
  return themeStorage;
}

export async function getTheme(request: Request) {
  if (!themeStorage) {
    throw new Error("You must initialize the theme storage first");
  }

  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  const themeValue = session.get("theme");
  return isTheme(themeValue) ? themeValue : Theme.LIGHT;
}

export async function setTheme(request: Request, theme: Theme) {
  if (!themeStorage) {
    throw new Error("You must initialize the theme storage first");
  }

  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  session.set("theme", theme);
  return session;
}

export async function commit(
  request: Request,
  session?: Session<SessionData, SessionData>
) {
  if (!themeStorage) {
    throw new Error("You must initialize the theme storage first");
  }

  const _session =
    session ?? (await themeStorage.getSession(request.headers.get("Cookie")));

  // expires in 1 year
  const expires = new Date(Date.now() + 31536000000);
  return themeStorage.commitSession(_session, { expires: expires });
}
