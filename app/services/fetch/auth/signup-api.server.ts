import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/signup-api.validate";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 회원가입 API
 * @param {Omit<FormFieldValues, 'confirmPassword'>} body
 * @param {ApiOptions?} options
 */
export function signupApi(
  body: Omit<FormFieldValues, "confirmPassword">,
  options?: ApiOptions
) {
  return FetchService.post(getPath(), body, options);
}

export const getPath = () => {
  return FetchService.defineApis.AUTH.SIGNUP;
};
