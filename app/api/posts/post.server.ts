// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostDetailRespSchema } from "../schema/resp";

/**
 * @description 포스트 조회 API
 * @param {number} id
 * @param {BaseApiOptions?} options
 */
export async function getPostApi(id: number, options?: BaseApiOptions) {
  const { json } = await ApiService.getJson<PostDetailRespSchema>(
    API_ENDPOINTS.POSTS.ID(id),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
