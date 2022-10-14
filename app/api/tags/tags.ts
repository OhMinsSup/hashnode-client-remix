import { apiClient } from "../client";
import { API_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

import type { TagListQuery } from "../schema/query";
import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { TagListRespSchema } from "../schema/resp";

export async function getTagListApi(query?: TagListQuery, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }
  if (query?.name) {
    search.set("name", query.name);
  }

  let url = API_ENDPOINTS.TAGS.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await apiClient.get(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<TagListRespSchema>>();
  return { result };
}
