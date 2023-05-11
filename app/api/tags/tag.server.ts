// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { TagDetailRespSchema } from "../schema/resp";

/**
 * @description 태그 조회 API
 * @param {string} tag
 * @param {BaseApiOptions?} options
 */
export async function getTagApi(tag: string, options?: BaseApiOptions) {
  const { json } = await ApiService.getJson<TagDetailRespSchema>(
    API_ENDPOINTS.TAGS.TAG(tag),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
