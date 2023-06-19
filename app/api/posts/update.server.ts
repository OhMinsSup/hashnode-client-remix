// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { PostRespSchema } from "../schema/resp";
import type { UpdatePostBody } from "./validation/update";

interface UpdatePostApiBody extends UpdatePostBody {}

/**
 * @description 포스트 수정 API
 * @param {number | string} id
 * @param {UpdatePostApiBody} body
 * @param {BaseApiOptions?} options
 */
export async function updatePostApi(
  id: number | string,
  body: UpdatePostApiBody,
  options?: BaseApiOptions
) {
  const { json } = await ApiService.putJson<PostRespSchema>(
    API_ENDPOINTS.POSTS.ID(id),
    body,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
