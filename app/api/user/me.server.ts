// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { UserRespSchema } from "../schema/resp";

/**
 * @description 유저 API
 * @param {BaseApiOptions?} options
 */
export async function getMeApi(options?: BaseApiOptions) {
  const { json, response } = await ApiService.getJson<UserRespSchema>(
    API_ENDPOINTS.USERS.ME,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json, response };
}
