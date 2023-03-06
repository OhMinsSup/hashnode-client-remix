import cookies from "cookie";
import { apiClient } from "~/api/client";

// server
import { applyHeaders } from "~/libs/server/utils";
// import { createCookieHeaders } from "~/libs/server/cookie.server";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// error
import { HTTPError } from "ky-universal";

// types
import type { Options } from "ky-universal";
import type { UserRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";
import type { LoaderArgs } from "@remix-run/cloudflare";

/**
 * @description 로그아웃 API
 * @param {Options} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _logoutApi(options?: Options) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.USERS.LOGOUT, {
    credentials: "include",
    headers,
    ...opts,
  });
  return response;
}

interface LogoutApiParams extends LoaderArgs {}

export async function logoutApi({ request }: LogoutApiParams) {
  const cookie = request.headers.get("Cookie") ?? null;
  if (!cookie) return null;
  const { access_token } = cookies.parse(cookie);
  if (!access_token) return null;
  const headers = new Headers();
  headers.append("Cookie", cookie);
  const response = await _logoutApi({
    headers,
  });
  const result = await response.json<AppAPI<null>>();
  return { result, header: response.headers };
}

/**
 * @description 유저 정보 API
 * @param {Options} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getSessionApi(options?: Options) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.get(API_ENDPOINTS.USERS.ME, {
    credentials: "include",
    headers,
    ...opts,
  });
  return response;
}

interface GetSessionApiParams extends LoaderArgs {}

/**
 * @description 유저 세션을 가져옵니다.
 * @param {GetSessionApiParams} param
 * @returns {Promise<{ type: "none" | "session" | "unauthenticated" | "error"; session: UserRespSchema | null }>}
 */
export async function getSessionApi(args: GetSessionApiParams) {
  const { request } = args;
  const cookie = request.headers.get("Cookie") ?? null;
  if (!cookie) {
    return {
      type: "none" as const,
      session: undefined,
      header: undefined,
    };
  }
  const { access_token } = cookies.parse(cookie);
  if (!access_token) {
    return {
      type: "none" as const,
      session: undefined,
      header: undefined,
    };
  }

  try {
    const headers = new Headers();
    headers.append("Cookie", cookie);
    const response = await _getSessionApi({
      headers,
    });
    const result = await response.json<AppAPI<UserRespSchema>>();
    return {
      type: "session" as const,
      session: result.result,
      header: request.headers,
    };
  } catch (error) {
    if (
      error instanceof HTTPError &&
      [403, 401].includes(error.response.status)
    ) {
      const result = await logoutApi(args).catch((e) => null);
      return {
        type: "unauthenticated" as const,
        session: undefined,
        header: result ? result.header : undefined,
      };
    }
    return {
      type: "error" as const,
      session: undefined,
      header: undefined,
    };
  }
}
