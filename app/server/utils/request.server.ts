import cookies from "cookie";

export function combineHeaders(
  ...headers: Array<ResponseInit["headers"] | null>
) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
}

export function combineResponseInits(
  ...responseInits: Array<ResponseInit | undefined>
) {
  let combined: ResponseInit = {};
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers),
    };
  }
  return combined;
}

export function clearAuthHeaders() {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  return headers;
}

export function readHeaderCookie(request: Request) {
  const cookie =
    request.headers.get("Cookie") || request.headers.get("Set-Cookie") || null;
  return cookie;
}

export function getParsedCookie(cookie: string) {
  return cookies.parse(cookie);
}
