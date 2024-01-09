// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/signin-api.validate";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 로그인 API
 * @param {FormFieldValues} body
 * @param {ApiOptions?} options
 */
export function signinApi(body: FormFieldValues, options?: ApiOptions) {
  return FetchService.post(getPath(), body, options);
}

/**
 * @version 2023-08-17
 * @description 로그인 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.AUTH.SIGNIN;
};
