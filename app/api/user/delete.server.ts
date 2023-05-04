// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import { clearCookie } from "~/libs/server/cookie.server";

/**
 * @description 유저 삭제 API
 * @param {BaseApiOptions?} options
 */
export async function deleteUserApi(options?: BaseApiOptions) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json, response } = await ApiService.deleteJson(
    API_ENDPOINTS.USERS.ME,
    __nextOpts?.init
  );
  const header = clearCookie(response.headers, "access_token");
  return { json, header };
}
