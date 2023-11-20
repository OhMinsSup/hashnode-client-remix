// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 포스트 조회 API
 * @param {number | string} id
 * @param {ApiOptions?} options
 */
export function getPostApi(id: string | number, options?: ApiOptions) {
  return FetchService.get(getPath(id), options);
}

/**
 * @version 2023-08-17
 * @description API Path
 */
export const getPath = (id: string | number) => {
  return FetchService.defineApis.POSTS.ID(id);
};
