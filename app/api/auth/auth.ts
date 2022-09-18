import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { Options } from "ky-universal";
import type { SignupBody, SigninBody } from "../schema/body";
import type { AuthRespSchema } from "../schema/resp";

function createCookieHeaders(setCookieHeader: string[] | undefined) {
  if (!setCookieHeader || setCookieHeader?.length === 0) {
    throw new Error("No cookie header");
  }
  const headers = new Headers();
  setCookieHeader.forEach((cookie) => {
    headers.append("Set-Cookie", cookie);
  });
  return headers;
}

export async function signupApi(body: SignupBody, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, {
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    json: body,
    ...opts,
  });
  const result = await response.json<AuthRespSchema>();
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { result, header };
}

export async function signinApi(body: SigninBody, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNIN, {
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    json: body,
    ...opts,
  });
  const result = await response.json<AuthRespSchema>();
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { result, header };
}
