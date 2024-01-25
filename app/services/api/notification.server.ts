import { getNotificationCountApi as $getNotificationCountApi } from "~/services/fetch/notifications/get-count-api.server";
import { FetchService } from "~/services/fetch/fetch.api";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";

export class NotificationApiService {
  constructor(
    private readonly $env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 알림 카운트 조회 API
   * @param {Request} request
   */
  async getNotificationCount(request: Request) {
    return $getNotificationCountApi({
      request,
    });
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 작성자가 받은 총 알림 카운트 조회 API
   * @param {Request} request
   */
  async count(request: Request) {
    try {
      const response = await this.getNotificationCount(request);
      const json = await FetchService.toJson<number>(response);
      return json?.result ?? 0;
    } catch (error) {
      return 0;
    }
  }
}
