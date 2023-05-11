// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { FileListRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

//  [Get] Path: app/api/files

export interface GetImageFilesApiSearchParams extends PaginationQuery {}

/**
 * @description 업로드된 이미지 리스트 가져오기
 * @param {GetImageFilesApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getImageFilesApi(
  query?: GetImageFilesApiSearchParams,
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
  const { json, response } = await ApiService.getJson<FileListRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.FILES.ROOT,
      searchParams
    ),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json, response };
}
