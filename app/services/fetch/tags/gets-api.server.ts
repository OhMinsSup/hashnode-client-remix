// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 태그 리스트 API
 * @param {FetchQuerySchema.TagList} query
 * @param {ApiOptions?} options
 */
export function getTagsApi(
  query: FetchQuerySchema.TagList,
  options?: ApiOptions
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
  } else {
    searchParams.set("type", "recent");
  }

  if (query?.category) {
    searchParams.set("category", query.category);
  } else {
    searchParams.set("category", "all");
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
  return FetchService.defineApis.TAGS.ROOT;
};
