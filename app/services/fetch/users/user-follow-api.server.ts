import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/user-follow-api.validate";

/**
 * @version 2023-08-17
 * @description 유저 팔로우 API
 * @param {FormFieldValues} body
 * @param {ApiOptions?} options
 */
export function postUserFollowApi(body: FormFieldValues, options?: ApiOptions) {
  return FetchService.post(getPath(), body, options);
}

export const getPath = () => {
  return FetchService.defineApis.USERS.USER_FOLLOW;
};
