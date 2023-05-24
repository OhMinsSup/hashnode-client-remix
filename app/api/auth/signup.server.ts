// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { AuthRespSchema } from "~/api/schema/resp";
import type { SignupBody } from "./validation/signup";
import type { BaseApiOptions } from "../client";

/**
 * @description 회원가입 API
 * @param {Omit<SignupBody, 'confirmPassword'>} body
 * @param {BaseApiOptions?} options
 */
export async function signupApi(
  body: Omit<SignupBody, "confirmPassword">,
  options?: BaseApiOptions
) {
  const { json, response } = await ApiService.postJson<
    AuthRespSchema,
    Omit<SignupBody, "confirmPassword">
  >(API_ENDPOINTS.AUTH.SIGNUP, body, options?.init);
  return { json, response };
}
