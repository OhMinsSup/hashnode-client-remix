// api
import { FetchService } from "~/services/fetch/fetch.client";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 로그아웃 API
 * @param {ApiOptions?} options
 */
export function signoutApi(options?: ApiOptions) {
  return FetchService.post(getPath(), undefined, options);
}

/**
 * @version 2023-08-17
 * @description 로그아웃 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.USERS.LOGOUT;
};
