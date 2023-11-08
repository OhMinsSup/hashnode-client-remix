// api
import { FetchService } from "services/fetch/fetch.client";

// constants
import type { ApiOptions } from "services/fetch/fetch.type";
import type { FormFieldValues } from "services/validate/user-update-api.validate";

/**
 * @version 2023-08-17
 * @description 유저 수정 API
 * @param {ApiOptions?} options
 */
export function putUserApi(input: FormFieldValues, options?: ApiOptions) {
  return FetchService.put(getPath(), input, options);
}

/**
 * @version 2023-08-17
 * @description 로그아웃 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.USERS.ME;
};
