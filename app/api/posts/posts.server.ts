// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

interface GetPostListApiSearchParams extends PaginationQuery {
  keyword?: string;
  type?: "recent" | "featured" | "past" | "personalized";
  startDate?: string;
  endDate?: string;
  tag?: string;
}

/**
 * @description 포스트 리스트 조회 API
 * @param {GetPostListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getPostListApi(
  query?: GetPostListApiSearchParams,
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
  const { json } = await ApiService.getJson<PostListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.POSTS.ROOT,
      searchParams
    ),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
