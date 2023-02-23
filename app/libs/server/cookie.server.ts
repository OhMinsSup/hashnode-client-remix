export function clearCookie() {}

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
