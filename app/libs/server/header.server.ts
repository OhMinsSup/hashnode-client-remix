export function applyHeaders(applyHeaders?: Headers | Record<string, any> | undefined) {
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
