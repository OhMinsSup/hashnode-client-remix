// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { TagFollowRespSchema } from "../schema/resp";

/**
 * @description 태그 팔로우 API
 * @param {string} tag
 * @param {BaseApiOptions?} options
 */
export async function postTagFollowApi(tag: string, options?: BaseApiOptions) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json } = await ApiService.postJson<TagFollowRespSchema>(
    API_ENDPOINTS.TAGS.TAG_FOLLOW(tag),
    {},
    __nextOpts?.init
  );
  return { json };
}
