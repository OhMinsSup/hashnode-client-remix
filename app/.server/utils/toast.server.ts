import { createCookieSessionStorage, redirect } from "@remix-run/cloudflare";
import { schema, type OptionalToast } from "~/services/validate/toast.validate";
import type { SessionData, SessionStorage } from "@remix-run/cloudflare";
import { combineHeaders } from "~/.server/utils/request.server";

const NAME = "hashnode.toast";
const TOAST_KEY = "toast";

let toastStorage: SessionStorage<SessionData, SessionData>;

export function initializeToast(cookieSecret: string) {
  if (toastStorage) {
    return toastStorage;
  }
  toastStorage = createCookieSessionStorage({
    cookie: {
      name: NAME,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secrets: [cookieSecret],
    },
  });
  return toastStorage;
}

export function getToastMessage(params?: Partial<OptionalToast>) {
  const _default: OptionalToast = {
    title: "error",
    description: "An error occurred. Please try again later.",
    type: "error",
  };

  const opts: OptionalToast = Object.assign({}, _default);
  for (const [key, value] of Object.entries(params ?? {})) {
    const keyName = key as keyof OptionalToast;
    // 값이 없는 경우 기본값으로 설정
    if (typeof value === "undefined" || value === null) {
      Object.assign(opts, { [keyName]: _default[keyName] });
      continue;
    }
    // 값이 있는 경우 해당 값으로 설정
    Object.assign(opts, { [keyName]: value });
  }

  return opts;
}

export async function createToastHeaders(optionalToast: OptionalToast) {
  if (!toastStorage) {
    throw new Error("You must initialize the toast storage first");
  }

  const session = await toastStorage.getSession();
  const toast = schema.parse(optionalToast);
  session.flash(TOAST_KEY, toast);
  const cookie = await toastStorage.commitSession(session);
  return new Headers({ "set-cookie": cookie });
}

export async function getToast(request: Request) {
  if (!toastStorage) {
    throw new Error("You must initialize the theme storage first");
  }

  const session = await toastStorage.getSession(request.headers.get("cookie"));
  const result = schema.safeParse(session.get(TOAST_KEY));
  const toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast
      ? new Headers({
          "set-cookie": await toastStorage.destroySession(session),
        })
      : null,
  };
}

export async function redirectWithToast(
  url: string,
  toast: OptionalToast,
  createToastHeaders: (optionalToast: OptionalToast) => Promise<Headers>,
  init?: ResponseInit
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
}
