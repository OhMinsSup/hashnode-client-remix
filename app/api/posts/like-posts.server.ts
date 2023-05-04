// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostLikeListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

interface GetLikePostListApiSearchParams extends PaginationQuery {}

/**
 * @description 좋아요 포스트 리스트 조회 API
 * @param {GetLikePostListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getLikePostListApi(
  query?: GetLikePostListApiSearchParams,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const searchParams = new URLSearchParams();
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "15");
  }
  const { json } = await ApiService.getJson<PostLikeListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.POSTS.GET_LIKES,
      searchParams
    ),
    __nextOpts?.init
  );
  return { json };
}
