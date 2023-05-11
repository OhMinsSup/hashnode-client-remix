// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export interface GetMyPostListApiSearchParams extends PaginationQuery {
  keyword?: string;
  isDeleted?: boolean;
}

/**
 * @description 내가 작성한 포스트 리스트 조회 API
 * @param {GetMyPostListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getMyPostListApi(
  query?: GetMyPostListApiSearchParams,
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
  if (query?.keyword) {
    searchParams.set("keyword", query.keyword);
  }
  if (query?.isDeleted) {
    searchParams.set("isDeleted", query.isDeleted.toString());
  }

  const { json } = await ApiService.getJson<PostListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.USERS.MY_POSTS,
      searchParams
    ),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
