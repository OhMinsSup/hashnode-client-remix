// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { AuthRespSchema } from "~/api/schema/resp";
import type { SigninBody } from "./validation/signin";
import type { BaseApiOptions } from "../client";

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
  return { json, response };
}
