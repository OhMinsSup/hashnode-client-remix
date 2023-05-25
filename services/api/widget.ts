// types
import { getWidgetBookmarksApi } from "~/api/widget/widget-bookmarks.server";
import { getAritcleCirclesApi } from "~/api/widget/aritcle-circles.server";
import type { Env } from "../env";

export class WidgetApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 위젯 북마크 가져오기
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getWidgetBookmarksApi>>}
   */
  async getWidgetBookmarks(
    request: Request
  ): Promise<ReturnType<typeof getWidgetBookmarksApi>> {
    return await getWidgetBookmarksApi({
      request,
    });
  }

  /**
   * @description 위젯 유저 정보 가져오기
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getAritcleCirclesApi>>}
   */
  async getAritcleCircles(
    request: Request
  ): Promise<ReturnType<typeof getAritcleCirclesApi>> {
    return await getAritcleCirclesApi(undefined, {
      request,
    });
  }
}
