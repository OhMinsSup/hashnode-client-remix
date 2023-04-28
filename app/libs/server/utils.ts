export type KyHeaders = HeadersInit | Record<string, string | undefined>;

export function applyHeaders(applyHeaders?: KyHeaders | undefined) {
  const headers = new Headers();
  if (applyHeaders instanceof Headers) {
    applyHeaders.forEach((value, key) => headers.append(key, value));
  } else if (typeof applyHeaders === "object") {
    Object.entries(applyHeaders).forEach(([key, value]) => {
      if (value) headers.append(key, value);
    });
  }
  return headers;
}

export function clearCookie(header: KyHeaders, cookie: string) {
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
