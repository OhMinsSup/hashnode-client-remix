// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { TagFollowRespSchema } from "../schema/resp";

/**
 * @description 태그 언팔로우 API
 * @param {string} tag
 * @param {BaseApiOptions?} options
 */
export async function deleteTagFollowApi(tag: string, options?: BaseApiOptions) {
  const { json } = await ApiService.deleteJson<TagFollowRespSchema>(
    API_ENDPOINTS.TAGS.TAG_FOLLOW(tag),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
