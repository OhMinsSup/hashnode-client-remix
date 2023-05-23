// api
import { ApiService } from "../client.next";

// utils
import { createCookieHeaders } from "~/libs/server/cookie.server";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { AuthRespSchema } from "~/api/schema/resp";
import type { SigninBody } from "./validation/signin";
import type { BaseApiOptions } from "../client.next";

/**
 * @description 로그인 API
 * @param {SigninBody} body
 * @param {BaseApiOptions?} options
 */
export async function signinApi(body: SigninBody, options?: BaseApiOptions) {
  const { json, response } = await ApiService.postJson<
    AuthRespSchema,
    SigninBody
  >(API_ENDPOINTS.AUTH.SIGNIN, body, options?.init);
  const cookieHeader = response.headers.get("set-cookie");
  const header = createCookieHeaders(cookieHeader ? [cookieHeader] : undefined);
  return { json, header, response };
}
