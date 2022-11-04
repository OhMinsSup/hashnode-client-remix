import cookies from "cookie";

export function applyAuth(request: Request) {
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return null;
  }

  const { access_token } = cookies.parse(cookie);

  if (!access_token) {
    return null;
  }

  return access_token;
}
