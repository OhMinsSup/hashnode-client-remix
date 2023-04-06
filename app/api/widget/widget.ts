// article-circles
import { apiClient } from "../client";
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";
import { isString } from "~/utils/assertion";
import { delayPromise } from "~/utils/util";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type {
  GetAritcleCirclesRespSchema,
  GetWidgetBookmarksRespSchema,
} from "../schema/resp";

// [Get] Path: /api/v1/widget/aritcle-circles

interface GetAritcleCirclesApiSearchParams {
  userId?: string | number;
}

interface GetAritcleCirclesApiParams extends LoaderArgs {}

/**
 * @description article-circles 조회 API
 * @param {GetAritcleCirclesApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getAritcleCirclesApi(
  query?: GetAritcleCirclesApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");

  const searchParams = new URLSearchParams();
  if (query?.userId) {
    searchParams.set(
      "userId",
      isString(query.userId) ? query.userId : query.userId.toString()
    );
  }

  const response = await apiClient.get(API_ENDPOINTS.WIDGET.ARTICLE_CIRCLES, {
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
 * @param {GetAritcleCirclesApiParams?} args
 * @returns {Promise<{ result: AppAPI<GetAritcleCirclesRespSchema> }>}
 */
export async function getAritcleCirclesApi(
  query?: GetAritcleCirclesApiSearchParams,
  args?: GetAritcleCirclesApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getAritcleCirclesApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<GetAritcleCirclesRespSchema>>();
  return { result };
}

/**
 * @description article-circles 조회 API (delay 1s)
 * @param {GetTagListApiSearchParams?} query
 * @param {GetAritcleCirclesApiParams?} args
 * @param {number?} delay - delay time (ms)
 * @returns {Promise<{ result: AppAPI<GetAritcleCirclesRespSchema> }>}
 */
export async function getAritcleCirclesDelayedApi(
  query?: GetAritcleCirclesApiSearchParams,
  args?: GetAritcleCirclesApiParams,
  delay = 200
) {
  const response = await getAritcleCirclesApi(query, args);
  await delayPromise(delay);
  return response;
}

// [Get] Path: /api/v1/widget/bookmarks

export interface GetWidgetBookmarksApiSearchParams {
  userId?: string | number;
}

export interface GetWidgetBookmarksApiParams extends LoaderArgs {}

/**
 * @description Bookmarks 조회 API
 * @param {GetWidgetBookmarksApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getWidgetBookmarksApi(
  query?: GetWidgetBookmarksApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");

  const response = await apiClient.get(API_ENDPOINTS.WIDGET.BOOKMARKS, {
    credentials: "include",
    headers,
    ...opts,
  });
  return response;
}

/**
 * @description 태그 리스트 조회 API
 * @param {GetWidgetBookmarksApiSearchParams?} query
 * @param {GetWidgetBookmarksApiParams?} args
 * @returns {Promise<{ result: AppAPI<GetWidgetBookmarksRespSchema> }>}
 */
export async function getWidgetBookmarksApi(
  query?: GetWidgetBookmarksApiSearchParams,
  args?: GetWidgetBookmarksApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getWidgetBookmarksApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<GetWidgetBookmarksRespSchema>>();
  return { result };
}

/**
 * @description article-circles 조회 API (delay 1s)
 * @param {GetWidgetBookmarksApiSearchParams?} query
 * @param {GetWidgetBookmarksApiParams?} args
 * @param {number?} delay - delay time (ms)
 * @returns {Promise<{ result: AppAPI<GetWidgetBookmarksRespSchema> }>}
 */
export async function getWidgetBookmarksDelayedApi(
  query?: GetWidgetBookmarksApiSearchParams,
  args?: GetWidgetBookmarksApiParams,
  delay = 200
) {
  const response = await getWidgetBookmarksApi(query, args);
  await delayPromise(delay);
  return response;
}
