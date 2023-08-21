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
export async function deleteUserApi(options?: BaseApiOptions) {
  const { json, response } = await ApiService.deleteJson(
    API_ENDPOINTS.USERS.ME,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json, response };
}
