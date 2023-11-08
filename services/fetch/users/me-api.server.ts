// api
import { FetchService } from "services/fetch/fetch.client";

// constants
import type { ApiOptions } from "services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 유저정보 API
 * @param {ApiOptions?} options
 */
export function getMeApi(options?: ApiOptions) {
  return FetchService.get(getPath(), options);
}

/**
 * @version 2023-08-17
 * @description 유저정보 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.USERS.ME;
};
