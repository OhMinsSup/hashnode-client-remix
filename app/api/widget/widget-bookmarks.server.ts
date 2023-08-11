// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { GetWidgetBookmarksRespSchema } from "../schema/resp";

export interface GetWidgetBookmarksApiSearchParams {
  userId?: string | number;
}

/**
 * @deprecated
 * @description Bookmarks 조회 API
 * @param {BaseApiOptions?} options
 */
export async function getWidgetBookmarksApi(options?: BaseApiOptions) {
  const { json } = await ApiService.getJson<GetWidgetBookmarksRespSchema>(
    API_ENDPOINTS.WIDGET.BOOKMARKS,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
