// api
import { ApiService } from "../client.next";

// utils
import { createCookieHeaders } from "~/libs/server/cookie.server";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { AuthRespSchema } from "~/api/schema/resp";
import type { SignupBody } from "./validation/signup";
import type { BaseApiOptions } from "../client.next";

/**
 * @description 회원가입 API
 * @param {Omit<SignupBody, 'confirmPassword'>} body
 * @param {BaseApiOptions?} options
 */
export async function signupApi(
  body: Omit<SignupBody, "confirmPassword">,
  options?: BaseApiOptions
) {
  const nextOptions = ApiService.middlewareForAuth(options);
  const { json, response } = await ApiService.postJson<
    AuthRespSchema,
    Omit<SignupBody, "confirmPassword">
  >(API_ENDPOINTS.AUTH.SIGNIN, body, nextOptions?.init);
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { json, header };
}
