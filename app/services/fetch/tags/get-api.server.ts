// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @description 태그 조회 API
 * @param {string} name
 * @param {ApiOptions?} options
 */
export async function getTagApi(name: string, options?: ApiOptions) {
  return FetchService.get(getPath(name), options);
}

/**
 * @version 2023-08-17
 * @description API Path
 */
export const getPath = (name: string) => {
  return FetchService.defineApis.TAGS.TAG(name);
};
