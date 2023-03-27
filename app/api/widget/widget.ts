// article-circles
import { apiClient } from "../client";
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";
import { isString } from "~/utils/assertion";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { GetAritcleCirclesRespSchema } from "../schema/resp";

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
