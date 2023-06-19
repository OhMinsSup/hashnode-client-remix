// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";

/**
 * @description 포스트 삭제 API
 * @param {number | string} id
 * @param {BaseApiOptions?} options
 */
export async function deletePostApi(
  id: number | string,
  options?: BaseApiOptions
) {
  const { json } = await ApiService.deleteJson<null>(
    API_ENDPOINTS.POSTS.ID(id),
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
