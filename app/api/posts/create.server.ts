// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostRespSchema } from "../schema/resp";
import type { CreatePostBody } from "./validation/create";

interface CreatePostApiBody extends CreatePostBody {}

/**
 * @description 포스트 생성 API
 * @param {CreatePostApiBody} body
 * @param {BaseApiOptions?} options
 */
export async function createPostApi(
  body: CreatePostApiBody,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const { json } = await ApiService.postJson<PostRespSchema>(
    API_ENDPOINTS.POSTS.ROOT,
    body,
    __nextOpts?.init
  );
  return { json };
}
