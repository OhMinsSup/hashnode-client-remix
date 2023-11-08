// api
import { FetchService } from "services/fetch/fetch.client";

// constants
import type { ApiOptions } from "services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 유저정보 API
 * @param {string} username
 * @param {ApiOptions?} options
 */
export function getUserApi(username: string, options?: ApiOptions) {
  return FetchService.get(getPath(username), options);
}

/**
 * @version 2023-08-17
 * @description 유저정보 API Path
 */
export const getPath = (username: string) => {
  return FetchService.defineApis.USERS.USERNAME(username);
};
