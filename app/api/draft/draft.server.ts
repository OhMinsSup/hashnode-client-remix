// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { DraftDetailRespSchema } from "../schema/resp";

/**
 * @description 포스트 조회 API
 * @param {number} id
 * @param {BaseApiOptions?} options
 */
export async function getDraftApi(id: number, options?: BaseApiOptions) {
  const { json } = await ApiService.getJson<DraftDetailRespSchema>(
    API_ENDPOINTS.DRAFT.ID(id),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
