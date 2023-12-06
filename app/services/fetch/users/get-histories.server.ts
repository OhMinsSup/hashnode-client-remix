// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @description 유저정보 API
 * @param {string} userId
 * @param {ApiOptions?} options
 */
export function getUserHistoriesApi(userId: string, options?: ApiOptions) {
  return FetchService.get(getPath(userId), options);
}

/**
 * @version 2023-08-17
 * @description 유저정보 API Path
 */
export const getPath = (userId: string) => {
  return FetchService.defineApis.USERS.HISTORTIES(userId);
};
