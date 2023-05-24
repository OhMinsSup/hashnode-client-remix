// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { UserUpdateBody } from "./validation/update";
import type { BaseApiOptions } from "../client";

/**
 * @description 유저 정보 업데이트 API
 * @param {UserUpdateBody} body
 * @param {BaseApiOptions?} options
 */
export async function putUserApi(body: UserUpdateBody, options?: BaseApiOptions) {
  const { json } = await ApiService.putJson<null, UserUpdateBody>(
    API_ENDPOINTS.USERS.ME,
    body,
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
