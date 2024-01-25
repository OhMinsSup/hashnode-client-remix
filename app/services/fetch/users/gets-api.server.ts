// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 유저 리스트 조회 API
 * @param {FetchQuerySchema.UserList} query
 * @param {ApiOptions?} options
 */
export function getUsersApi(
  query: FetchQuerySchema.UserList,
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
  if (query?.name) {
    searchParams.set("name", query.name);
  }
  if (query?.type) {
    searchParams.set("type", query.type);
  }
  if (query?.category) {
    searchParams.set("category", query.category);
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
  return FetchService.defineApis.USERS.ROOT;
};
