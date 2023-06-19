// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { DraftListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export interface GetDraftListApiSearchParams extends PaginationQuery {
  keyword?: string;
}

/**
 * @description 임시 게시글 리스트 조회 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getDraftListApi(
  query?: GetDraftListApiSearchParams,
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
  const { json } = await ApiService.getJson<DraftListRespSchema>(
    ApiService.getSearchParams(
      API_ENDPOINTS.DRAFT.ROOT,
      searchParams
    ),
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
