import { apiClient } from "../client";
import cookies from "cookie";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { Options } from "ky-universal";
import type { UserRespSchema } from "../schema/resp";
import type { AppAPI } from "../schema/api";

export async function getUserInfoApi(options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.get(API_ENDPOINTS.USERS.ME, {
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<UserRespSchema>>();
  return { result };
}

export async function getUserInfoSsrApi(access_token: string) {
  const { result } = await getUserInfoApi({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set(
            "Cookie",
            cookies.serialize("access_token", access_token)
          );
          return request;
        },
      ],
    },
  });
  return result;
}
