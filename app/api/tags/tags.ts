// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { TagListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export interface GetTagListApiSearchParams extends PaginationQuery {
  name?: string;
  type?: "recent" | "popular" | "new" | "trending";
  category?: "week" | "all" | "month" | "year";
}

/**
 * @description 태그 리스트 조회 API
 * @param {GetTagListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getTagListApi(
  query?: GetTagListApiSearchParams,
  options?: BaseApiOptions
) {
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "5");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.name) {
    searchParams.set("name", query.name);
  }
  if (query?.type) {
    searchParams.set("type", query.type);
  }
  if (query?.category) {
    searchParams.set("category", query.category);
  } else {
    searchParams.set("category", "all");
  }
  const { json } = await ApiService.getJson<TagListRespSchema>(
    ApiService.getSearchParams(API_ENDPOINTS.TAGS.ROOT, searchParams),
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
