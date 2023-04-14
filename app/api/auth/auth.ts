import { apiClient } from "~/api/client";

// server
import { createCookieHeaders } from "~/libs/server/cookie";
import { applyHeaders } from "~/libs/server/utils";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { Options } from "ky-universal";
import type { AuthRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";
import type { SignupBody } from "./validation/signup";
import type { SigninBody } from "./validation/signin";

/**
 * @description 회원가입 API
 * @param {Omit<SignupBody, 'confirmPassword'>} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _signupApi(
  body: Omit<SignupBody, "confirmPassword">,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, {
    headers,
    json: body,
    ...opts,
  });
  return response;
}

/**
 * @description 회원가입 API
 * @param {Omit<SignupBody, 'confirmPassword'>} body
 * @param {Options?} options
 * @returns {Promise<{ result: AppAPI<AuthRespSchema>; header: Headers }>}
 */
export async function signupApi(
  body: Omit<SignupBody, "confirmPassword">,
  options?: Options
) {
  const response = await _signupApi(body, options);
  const result = await response.json<AppAPI<AuthRespSchema>>();
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { result, header };
}

/**
 * @description 로그인 API
 * @param {SigninBody} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _signinApi(body: SigninBody, options?: Options) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNIN, {
    headers,
    json: body,
    ...opts,
  });
  return response;
}

/**
 * @description 로그인 API
 * @param {SigninBody} body
 * @param {Options?} options
 * @returns {Promise<{ result: AppAPI<AuthRespSchema>; header: Headers }>}
 */
export async function signinApi(body: SigninBody, options?: Options) {
  const response = await _signinApi(body, options);
  const result = await response.json<AppAPI<AuthRespSchema>>();
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { result, header };
}
