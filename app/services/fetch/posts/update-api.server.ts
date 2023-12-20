import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

/**
 * @version 2023-08-17
 * @description 게시물 수정 API
 * @param {string} id
 * @param {FormFieldValues} body
 * @param {ApiOptions?} options
 */
export function updatePostApi(
  id: string,
  body: FormFieldValues,
  options?: ApiOptions
) {
  return FetchService.put(getPath(id), body, options);
}

export const getPath = (id: string) => {
  return FetchService.defineApis.POSTS.ID(id);
};
