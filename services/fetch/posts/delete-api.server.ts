// api
import { FetchService } from "services/fetch/fetch.client";

// constants
import type { ApiOptions } from "services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 게시물 삭제 API
 * @param {string | number} id
 * @param {ApiOptions?} options
 */
export function deletePostApi(id: string | number, options?: ApiOptions) {
  return FetchService.get(getPath(id), options);
}

/**
 * @version 2023-08-17
 * @description 게시물 삭제 API Path
 */
export const getPath = (id: string | number) => {
  return FetchService.defineApis.POSTS.ID(id);
};
