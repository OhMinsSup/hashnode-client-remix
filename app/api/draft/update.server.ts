// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { DraftRespSchema } from "../schema/resp";
import type { DraftBody } from "./validation/draft";

interface UpdateDraftApiBody extends DraftBody {}

/**
 * @description 임시 게시글 수정 API
 * @param {number | string} id
 * @param {UpdateDraftApiBody} body
 * @param {BaseApiOptions?} options
 */
export async function updateDraftApi(
  id: number | string,
  body: UpdateDraftApiBody,
  options?: BaseApiOptions
) {
  const { json } = await ApiService.putJson<DraftRespSchema>(
    API_ENDPOINTS.DRAFT.ID(id),
    body,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
