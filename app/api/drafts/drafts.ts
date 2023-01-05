import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// types
import type { Options } from "ky-universal";
import type { DraftListRespSchema, DraftRespSchema } from "../schema/resp";
import type { AppAPI } from "../schema/api";
import type { PostBody } from "../schema/body";
import type { PaginationQuery } from "../schema/query";

export async function createDraftsApi(
  body: Partial<PostBody>,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.NEW, {
    json: body,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

export async function saveDraftsApi(
  body: Partial<PostBody & { draftId: number }>,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.SAVE_DATA, {
    json: body,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

/// list

export async function getDraftsListApi(
  query?: PaginationQuery,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }

  let url = API_ENDPOINTS.DRAFTS.ROOT;
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
  const result = await response.json<AppAPI<DraftListRespSchema>>();
  return { result };
}
