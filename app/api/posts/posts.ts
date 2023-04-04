import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";
import { applyHeaders } from "~/libs/server/utils";

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
import type { PaginationQuery, PostListQuery } from "../schema/query";
import type { LoaderArgs, ActionArgs } from "@remix-run/cloudflare";
import { delayPromise } from "~/utils/util";

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

//  [Get] Path: app/api/posts

interface GetPostsApiSearchParams extends PaginationQuery {
  keyword?: string;
  type?: "recent" | "featured" | "past" | "personalized";
  startDate?: string;
  endDate?: string;
}

interface GetPostsApiParams extends LoaderArgs {}

/**
 * @description Get posts
 * @param {GetPostsApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getPostsApi(
  query?: GetPostsApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "15");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.keyword) {
    searchParams.set("keyword", query.keyword);
  }
  if (query?.type) {
    searchParams.set("type", query.type);
  }
  if (query?.startDate && query?.endDate) {
    searchParams.set("startDate", query.startDate);
    searchParams.set("endDate", query.endDate);
  }
  const response = await apiClient.get(API_ENDPOINTS.POSTS.ROOT, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description Get posts
 * @param {GetPostsApiSearchParams?} query
 * @param {GetPostsApiParams?} args
 * @returns {Promise<{ result: AppAPI<PostListRespSchema> }>}
 */
export async function getPostsApi(
  query?: GetPostsApiSearchParams,
  args?: GetPostsApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getPostsApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<PostListRespSchema>>();
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

/**
 * @description Get top posts with delay
 * @param {GetTopPostsApiSearchParams?} query
 * @param {GetTopPostsApiParams?} args
 * @param {number} delay
 * @returns {Promise<{ result: AppAPI<GetTopPostsRespSchema> }>}
 */
export async function getTopPostsDelayedApi(
  query?: GetTopPostsApiSearchParams,
  args?: GetTopPostsApiParams,
  delay = 200
) {
  const response = await getTopPostsApi(query, args);
  await delayPromise(delay);
  return response;
}

// [Post] Path: app/api/posts

interface PostPostsApiBody extends PostBody {}

interface PostPostsApiParams extends ActionArgs {}

/**
 * @description Get top posts
 * @param {PostPostsApiBody?} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _postPostsApi(body: PostPostsApiBody, options?: Options) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.POSTS.ROOT, {
    credentials: "include",
    headers,
    json: body,
    ...opts,
  });
  return response;
}

/**
 * @description Get top posts
 * @param {PostPostsApiBody?} body
 * @param {PostPostsApiParams?} args
 * @returns {Promise<{ result: AppAPI<PostRespSchema> }>}
 */
export async function postPostsApi(
  body: PostPostsApiBody,
  args?: PostPostsApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _postPostsApi(body, {
    headers,
  });

  const result = await response.json<AppAPI<PostRespSchema>>();
  return { result };
}

//  [Get]: Path: app/api/posts/get-likes

interface GetLikePostsApiSearchParams extends PaginationQuery {}

interface GetLikePostsApiParams extends LoaderArgs {}

/**
 * @description Get top posts
 * @param {GetLikePostsApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getLikePostsApi(
  query?: GetLikePostsApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  }
  const response = await apiClient.get(API_ENDPOINTS.POSTS.GET_LIKES, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description Get posts
 * @param {GetPostsApiSearchParams?} query
 * @param {GetPostsApiParams?} args
 * @returns {Promise<{ result: AppAPI<PostLikeListRespSchema> }>}
 */
export async function getLikePostsApi(
  query?: GetLikePostsApiSearchParams,
  args?: GetLikePostsApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getLikePostsApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<PostLikeListRespSchema>>();
  return { result };
}
