import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 게시물 작성 API
 * @param {FormFieldValues} body
 * @param {ApiOptions?} options
 */
export function createPostApi(body: FormFieldValues, options?: ApiOptions) {
  return FetchService.post(getPath(), body, options);
}

export const getPath = () => {
  return FetchService.defineApis.POSTS.ROOT;
};
