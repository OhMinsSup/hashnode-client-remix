import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { Options } from "ky-universal";
import type { UserRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";

/**
 * @version 1.0.0
 * @description 유저 정보를 가져옵니다.
 * @param {Options} options
 * @returns {Promise<{ result: AppAPI<UserRespSchema> }>}
 */
export async function getUserInfoApi(
  options?: Options
): Promise<{ result: AppAPI<UserRespSchema> }> {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.get(API_ENDPOINTS.USERS.ME, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<UserRespSchema>>();
  return { result };
}
