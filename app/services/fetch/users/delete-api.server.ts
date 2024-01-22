// api
import { FetchService } from "~/services/fetch/fetch.api";

// constants
import type { ApiOptions } from "~/services/fetch/fetch.type";

/**
 * @version 2023-08-17
 * @deprecated
 * @description 유저 삭제 API
 * @param {ApiOptions?} options
 */
export function deleteUserApi(options?: ApiOptions) {
  return FetchService.delete(getPath(), options);
}

/**
 * @version 2023-08-17
 * @description 로그아웃 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.USERS.ME;
};
