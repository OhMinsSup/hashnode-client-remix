// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 포스트 리스트 조회 API
 * @param {FetchQuerySchema.PostList} query
 * @param {ApiOptions?} options
 */
export function getPostsApi(
  query: FetchQuerySchema.PostList,
  options?: ApiOptions
) {
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "15");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.keyword) {
    searchParams.set("keyword", query.keyword);
  }
  if (query?.type) {
    searchParams.set("type", query.type);
  }
  if (query?.startDate && query?.endDate) {
    searchParams.set("startDate", query.startDate);
    searchParams.set("endDate", query.endDate);
  }
  if (query?.tag) {
    searchParams.set("tag", query.tag);
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
  return FetchService.defineApis.POSTS.ROOT;
};
