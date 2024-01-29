// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @deprecated
 * @version 2023-08-17
 * @description 알림 카운트 조회 API
 * @param {ApiOptions?} options
 */
export function getNotificationCountApi(options?: ApiOptions) {
  return FetchService.get(getPath(), options);
}

/**
 * @deprecated
 * @version 2023-08-17
 * @description API Path
 */
export const getPath = () => {
  return FetchService.defineApis.NOTIFICATIONS.GET_COUNT;
};
