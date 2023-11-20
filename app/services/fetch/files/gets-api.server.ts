// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 파일 리스트 조회 API
 * @param {FetchQuerySchema.PostList} query
 * @param {ApiOptions?} options
 */
export function getFilesApi(
  query: FetchQuerySchema.PostList,
  options?: ApiOptions
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

  return FetchService.get(
    FetchService.getSearchParams(getPath(), searchParams),
    options
  );
}

/**
 * @version 2023-08-17
 * @description API Path
 */
export const getPath = () => {
  return FetchService.defineApis.FILES.ROOT;
};
