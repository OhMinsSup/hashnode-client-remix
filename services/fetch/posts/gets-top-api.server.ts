// api
import { FetchService } from "services/fetch/fetch.client";

// constants
import type { ApiOptions } from "services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description Get top posts
 * @param {FetchQuerySchema.GetTopPost} query
 * @param {ApiOptions?} options
 */
export function getTopPostsApi(
  query?: FetchQuerySchema.GetTopPost,
  options?: ApiOptions
) {
  const searchParams = new URLSearchParams();
  if (query?.duration) {
    searchParams.set("duration", query.duration.toString());
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
  return FetchService.defineApis.POSTS.GET_TOP_POSTS;
};
