import { apiClient } from "../client";
import cookies from "cookie";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { Options } from "ky-universal";
import type { PostRespSchema } from "../schema/resp";
import type { AppAPI } from "../schema/api";
import type { PostBody } from "../schema/body";

export async function createPostsApi(body: PostBody, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.POSTS.ROOT, {
    json: body,
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<PostRespSchema>>();
  return { result };
}

export async function createPostsSsrApi(body: PostBody, access_token: string) {
  const { result } = await createPostsApi(body, {
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
