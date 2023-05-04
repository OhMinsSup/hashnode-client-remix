// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { GetTopPostsRespSchema } from "../schema/resp";

interface GetTopPostsApiSearchParams {
  duration: number;
}

/**
 * @description Get top posts
 * @param {GetTopPostsApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getTopPostsApi(
  query?: GetTopPostsApiSearchParams,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const searchParams = new URLSearchParams();
  if (query?.duration) {
    searchParams.set("duration", query.duration.toString());
  }
  const { json } = await ApiService.getJson<GetTopPostsRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.POSTS.GET_TOP_POSTS,
      searchParams
    ),
    __nextOpts?.init
  );
  return { json };
}
