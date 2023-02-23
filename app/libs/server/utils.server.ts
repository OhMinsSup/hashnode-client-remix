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
