import { apiClient } from "../client";
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { TagListRespSchema } from "../schema/resp";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { delayPromise } from "~/utils/util";

// [Get] Path: /api/v1/tags

interface GetTagListApiSearchParams {
  limit?: number;
  cursor?: number;
  name?: string;
  type?: string;
}

interface GetTagListApiParams extends LoaderArgs {}

/**
 * @description 태그 리스트 조회 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getTagListApi(
  query?: GetTagListApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
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
  const response = await apiClient.get(API_ENDPOINTS.TAGS.ROOT, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description 태그 리스트 조회 API
 * @param {GetTagListApiSearchParams?} query
 * @param {GetTagListApiParams?} args
 * @returns {Promise<{ result: AppAPI<TagListRespSchema> }>}
 */
export async function getTagListApi(
  query?: GetTagListApiSearchParams,
  args?: GetTagListApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getTagListApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<TagListRespSchema>>();
  return { result };
}

/**
 * @description 태그 리스트 조회 API (delay)
 * @param {GetTagListApiSearchParams?} query
 * @param {GetTagListApiParams?} args
 * @param {number} delay
 * @returns {Promise<{ result: AppAPI<TagListRespSchema> }>}
 */
export async function getTagListDelayedApi(
  query?: GetTagListApiSearchParams,
  args?: GetTagListApiParams,
  delay = 200
) {
  const response = await getTagListApi(query, args);
  await delayPromise(delay);
  return response;
}
