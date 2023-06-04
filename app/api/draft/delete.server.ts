// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";

/**
 * @description 임시 게시글 삭제 API
 * @param {number} id
 * @param {BaseApiOptions?} options
 */
export async function deleteDraftApi(id: number, options?: BaseApiOptions) {
  const { json } = await ApiService.deleteJson(
    API_ENDPOINTS.DRAFT.ID(id),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
