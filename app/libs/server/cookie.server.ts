import { applyHeaders } from "./header.server";

export function clearCookie(header: Headers, cookie: string) {
  const headers = applyHeaders(header);
  headers.append("Set-Cookie", `${cookie}=; Max-Age=0`);
  return headers;
}

export function createCookieHeaders(setCookieHeader: string[] | undefined) {
  if (!setCookieHeader || setCookieHeader?.length === 0) {
    throw new Error("No cookie header");
  }
  const headers = new Headers();
  setCookieHeader.forEach((cookie) => {
    headers.append("Set-Cookie", cookie);
  });
  return headers;
}
