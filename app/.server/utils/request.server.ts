import cookies from 'cookie';

export type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export function combineHeaders(
  ...headers: Array<ResponseInit['headers'] | null>
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
    'Set-Cookie',
    'hashnode.access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  );
  return headers;
}

export function getCookie(request: Request) {
  const headers = request.headers;
  const cookie = headers.get('Cookie') || headers.get('Set-Cookie');
  const cookieData = cookie ? cookies.parse(cookie) : null;
  const hasAuthToken = cookieData?.['hashnode.access_token'] ? true : false;
  return {
    // hasAuthToken이 존재하면 cookieData는 무조건 존재한다의 타입을 명시
    cookies: cookie,
    cookieData,
    hasAuthToken,
  };
}
