// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 작성자만 볼 수 있는 포스트 상세 조회 API
 * @param {string | number} id
 * @param {ApiOptions?} options
 */
export function getOwnerPostDetailApi(
  id: string | number,
  options?: ApiOptions
) {
  return FetchService.get(getPath(id), options);
}

/**
 * @version 2023-08-17
 * @description 작성자만 볼 수 있는 포스트 상세 조회 API Path
 */
export const getPath = (id: string | number) => {
  return FetchService.defineApis.USERS.OWNER_POSTS.ID(id);
};
