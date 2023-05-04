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
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json } = await ApiService.getJson<PostDetailRespSchema>(
    API_ENDPOINTS.POSTS.ID(id),
    __nextOpts?.init
  );
  return { json };
}
