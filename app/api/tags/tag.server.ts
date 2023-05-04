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
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json } = await ApiService.getJson<TagDetailRespSchema>(
    API_ENDPOINTS.TAGS.TAG(tag),
    __nextOpts?.init
  );
  return { json };
}
