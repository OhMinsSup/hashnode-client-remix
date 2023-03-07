import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";

// types
import type { Options } from "ky-universal";
import type { DraftListRespSchema, DraftRespSchema } from "../schema/resp";
import type { AppAPI } from "../schema/api";
import type { PostBody } from "../schema/body";
import type { LoaderArgs } from "@remix-run/cloudflare";

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
  body: Partial<PostBody & { draftId: number | string }>,
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

interface GetDraftListApiSearchParams {
  limit?: number;
  cursor?: number;
  keyword?: string;
}

interface GetDraftListApiParams extends LoaderArgs {}

/**
 * @description 초안 포스트 리스트 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getDraftListApi(
  query?: GetDraftListApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "10");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.keyword) {
    searchParams.set("keyword", query.keyword);
  }
  const response = await apiClient.get(API_ENDPOINTS.DRAFTS.ROOT, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description 초안 포스트 리스트 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<{ result: AppAPI<DraftListRespSchema> }>}
 */
export async function getDraftsListApi(
  query?: GetDraftListApiSearchParams,
  args?: GetDraftListApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getDraftListApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<DraftListRespSchema>>();
  return { result };
}
