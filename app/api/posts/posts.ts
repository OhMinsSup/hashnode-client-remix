import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// types
import type { Options } from "ky-universal";
import type {
  PostDetailRespSchema,
  PostListRespSchema,
  PostRespSchema,
  GetTopPostsRespSchema,
  PostLikeListRespSchema,
} from "../schema/resp";
import type { AppAPI } from "../schema/api";
import type { PostBody } from "../schema/body";
import type { PostListQuery, GetTopPostsQuery } from "../schema/query";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { applyHeaders } from "~/libs/server/utils";

/// create

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

/// list

export async function getPostsListApi(
  query?: PostListQuery,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }
  if (query?.keyword) {
    search.set("keyword", query.keyword);
  }

  if (query?.type) {
    search.set("type", query.type);
  }

  if (query?.startDate && query?.endDate) {
    search.set("startDate", query.startDate);
    search.set("endDate", query.endDate);
  }

  let url = API_ENDPOINTS.POSTS.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await apiClient.get(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<PostListRespSchema>>();
  return { result };
}

export async function getPostsLikeListApi(
  query?: PostListQuery,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }

  let url = API_ENDPOINTS.POSTS.GET_LIKES;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await apiClient.get(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<PostLikeListRespSchema>>();
  return { result };
}

// detail item

export async function getPostApi(id: number | string, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.get(API_ENDPOINTS.POSTS.ID(id), {
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<PostDetailRespSchema>>();
  return { result };
}

// [Get] Path: app/api/posts/get-top-posts

interface GetTopPostsApiSearchParams {
  duration: number;
}

interface GetTopPostsApiParams extends LoaderArgs {}

/**
 * @description Get top posts
 * @param {GetTopPostsApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getTopPostsApi(
  query?: GetTopPostsApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.duration) {
    searchParams.set("duration", query.duration.toString());
  }
  const response = await apiClient.get(API_ENDPOINTS.POSTS.GET_TOP_POSTS, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description Get top posts
 * @param {GetTopPostsApiSearchParams?} query
 * @param {GetTopPostsApiParams?} args
 * @returns {Promise<{ result: AppAPI<GetTopPostsRespSchema> }>}
 */
export async function getTopPostsApi(
  query?: GetTopPostsApiSearchParams,
  args?: GetTopPostsApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getTopPostsApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<GetTopPostsRespSchema>>();
  return { result };
}
