import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/tag-follow-api.validate";

/**
 * @version 2023-08-17
 * @description 태그 팔로우 API
 * @param {FormFieldValues} body
 * @param {ApiOptions?} options
 */
export function postTagFollowApi(body: FormFieldValues, options?: ApiOptions) {
  return FetchService.post(getPath(), body, options);
}

export const getPath = () => {
  return FetchService.defineApis.TAGS.TAG_FOLLOW;
};
