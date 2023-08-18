// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";

/**
 * @deprecated
 * @description 유저 삭제 API
 * @param {BaseApiOptions?} options
 */
export async function logoutApi(options?: BaseApiOptions) {
  const { json, response } = await ApiService.postJson(
    API_ENDPOINTS.USERS.LOGOUT,
    undefined,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  const header = response.headers;
  return { json, header };
}
