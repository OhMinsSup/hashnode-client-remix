// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { UserRespSchema } from "../schema/resp";

/**
 * @description 유저 정보 API
 * @param {string} username
 * @param {BaseApiOptions?} options
 */
export async function getUserApi(username: string, options?: BaseApiOptions) {
  const { json, response } = await ApiService.getJson<UserRespSchema>(
    API_ENDPOINTS.USERS.USERNAME(username),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json, response };
}
