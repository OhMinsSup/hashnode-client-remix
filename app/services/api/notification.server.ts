import { getNotificationCountApi as $getNotificationCountApi } from "~/services/fetch/notifications/get-count-api.server";
import { BaseError, ErrorType } from "../error";
import { RESULT_CODE } from "~/constants/constant";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";

export class NotificationApiService {
  constructor(private readonly opts: HashnodeApiConstructorOptions) {}

  private get $agent() {
    return this.opts.services.agent;
  }

  private get $server() {
    return this.opts.services.server;
  }

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
      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "authentication failed. Please try again later."
        );
        throw error;
      }
      const response = await this.$agent.getNotificationCountHandler({
        headers: {
          Cookie: cookie,

          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data?.resultCode !== RESULT_CODE.OK) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "failed to update the user. Please try again later."
        );
        throw error;
      }
      return data.result as number;
    } catch (error) {
      return 0;
    }
  }
}
