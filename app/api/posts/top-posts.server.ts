// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { GetTopPostsRespSchema } from "../schema/resp";

export interface GetTopPostsApiSearchParams {
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
  const searchParams = new URLSearchParams();
  if (query?.duration) {
    searchParams.set("duration", query.duration.toString());
  }
  const { json } = await ApiService.getJson<GetTopPostsRespSchema>(
    ApiService.getSearchParams(API_ENDPOINTS.POSTS.GET_TOP_POSTS, searchParams),
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
