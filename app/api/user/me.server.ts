// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { UserRespSchema } from "../schema/resp";

/**
 * @description 유저 API
 * @param {BaseApiOptions?} options
 */
export async function getMeApi(options?: BaseApiOptions) {
  const __nextOpts = ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options));
  const { json, response } = await ApiService.getJson<UserRespSchema>(
    API_ENDPOINTS.USERS.ME,
    __nextOpts?.init
  );
  return { json, response };
}
