// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { isString } from "~/utils/assertion";

// types
import type { BaseApiOptions } from "../client.next";
import type { GetWidgetBookmarksRespSchema } from "../schema/resp";

export interface GetWidgetBookmarksApiSearchParams {
  userId?: string | number;
}

/**
 * @description Bookmarks 조회 API
 * @param {GetWidgetBookmarksApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getWidgetBookmarksApi(
  query?: GetWidgetBookmarksApiSearchParams,
  options?: BaseApiOptions
) {
  let searchParams: URLSearchParams | undefined = undefined;
  if (query?.userId) {
    searchParams = new URLSearchParams();
    searchParams.set(
      "userId",
      isString(query.userId) ? query.userId : query.userId.toString()
    );
  }
  const { json } = await ApiService.getJson<GetWidgetBookmarksRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.WIDGET.BOOKMARKS,
      searchParams
    ),
    ApiService.middlewareForAuth(ApiService.middlewareSetAuthticated(options))
      ?.init
  );
  return { json };
}
