// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { DraftRespSchema } from "../schema/resp";
import type { DraftBody } from "./validation/draft";

interface CreateDraftApiBody extends DraftBody {}

/**
 * @description 임시 게시물 생성 API
 * @param {CreatePostApiBody} body
 * @param {BaseApiOptions?} options
 */
export async function createDraftApi(
  body: CreateDraftApiBody,
  options?: BaseApiOptions
) {
  const { json } = await ApiService.postJson<DraftRespSchema>(
    API_ENDPOINTS.DRAFT.ROOT,
    body,
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
