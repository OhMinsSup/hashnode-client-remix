// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 좋아요 포스트 리스트 조회 API
 * @param {FetchQuerySchema.Pagination} query
 * @param {ApiOptions?} options
 */
export function getLikePostsApi(
  query?: FetchQuerySchema.Pagination,
  options?: ApiOptions
) {
  const searchParams = new URLSearchParams();
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "5");
  }
  return FetchService.get(
    FetchService.getSearchParams(getPath(), searchParams),
    options
  );
}

/**
 * @version 2023-08-17
 * @description API Path
 */
export const getPath = () => {
  return FetchService.defineApis.POSTS.GET_LIKES;
};
