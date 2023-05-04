// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { UserUpdateBody } from "./validation/update";
import type { BaseApiOptions } from "../client.next";

/**
 * @description 유저 정보 업데이트 API
 * @param {UserUpdateBody} body
 * @param {BaseApiOptions?} options
 */
export async function putUserApi(
  body: UserUpdateBody,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json } = await ApiService.putJson<null, UserUpdateBody>(
    API_ENDPOINTS.USERS.ME,
    body,
    __nextOpts?.init
  );
  return { json };
}
