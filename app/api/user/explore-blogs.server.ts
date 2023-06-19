// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { ExploreBlogsListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export interface GetExploreBlogsApiSearchParams extends PaginationQuery {
  category: "week" | "all" | "month" | "year";
}

/**
 * @description 포스트 리스트 조회 API
 * @param {GetExploreBlogsApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getExploreBlogsApi(
  query?: GetExploreBlogsApiSearchParams,
  options?: BaseApiOptions
) {
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "50");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.category) {
    searchParams.set("category", query.category);
  } else {
    searchParams.set("category", "all");
  }
  const { json } = await ApiService.getJson<ExploreBlogsListRespSchema>(
    ApiService.getSearchParams(
      API_ENDPOINTS.USERS.TRENDING_USERS,
      searchParams
    ),
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
