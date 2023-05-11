import omit from "lodash-es/omit";

// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client.next";
import type { PostRespSchema } from "../schema/resp";
import type { UpdatePostBody } from "./validation/update";

interface UpdatePostApiBody extends UpdatePostBody {}

/**
 * @description 포스트 수정 API
 * @param {UpdatePostApiBody} body
 * @param {BaseApiOptions?} options
 */
export async function updatePostApi(
  body: UpdatePostApiBody,
  options?: BaseApiOptions
) {
  const { json } = await ApiService.putJson<PostRespSchema>(
    API_ENDPOINTS.POSTS.ID(body.id),
    omit(body, ["id"]),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
