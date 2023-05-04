// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { TagListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

interface GetTagTrendingApiSearchParams extends PaginationQuery {
  category: "week" | "all" | "month" | "year";
}

/**
 * @description 태그 리스트 조회 API
 * @param {GetTagTrendingApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getTagTrendingListApi(
  query?: GetTagTrendingApiSearchParams,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "5");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.category) {
    searchParams.set("category", query.category.toString());
  } else {
    searchParams.set("category", "all");
  }
  const { json } = await ApiService.getJson<TagListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.TAGS.TAG_TRENDING,
      searchParams
    ),
    __nextOpts?.init
  );
  return { json };
}
