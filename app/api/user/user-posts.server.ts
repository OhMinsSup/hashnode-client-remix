// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { PostListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export interface GetUserPostListApiSearchParams extends PaginationQuery {}

/**
 * @description 내가 작성한 포스트 리스트 조회 API
 * @param {GetUserPostListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getUserPostListApi(
  username: string,
  query?: GetUserPostListApiSearchParams,
  options?: BaseApiOptions
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

  const { json } = await ApiService.getJson<PostListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.USERS.USERNAME_POSTS(username),
      searchParams
    ),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
