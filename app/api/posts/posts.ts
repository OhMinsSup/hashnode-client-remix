import { apiClient } from "../client";
import { useQuery } from "@tanstack/react-query";

// constants
import { API_ENDPOINTS, QUERIES_KEY } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// types
import type { Options } from "ky-universal";
import type {
  PostDetailRespSchema,
  PostListRespSchema,
  PostRespSchema,
  GetTopPostsRespSchema,
} from "../schema/resp";
import type { AppAPI, Nullable } from "../schema/api";
import type { PostBody } from "../schema/body";
import type { PostListQuery, GetTopPostsQuery } from "../schema/query";
import type { UseQueryOptions } from "@tanstack/react-query";

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

interface PostsListReturnValue {
  result: AppAPI<PostListRespSchema>;
}

interface PostsListReturnValueQueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, string[]>,
    "queryKey" | "queryFn"
  > {
  initialData: TQueryFnData | (() => TQueryFnData);
}
export function usePostsQuery(
  query?: PostListQuery,
  options?: PostsListReturnValueQueryOptions<
    PostsListReturnValue,
    Record<string, any>,
    PostsListReturnValue
  >
) {
  const resp = useQuery(
    QUERIES_KEY.POSTS.ROOT(query),
    (_key) => getPostsListApi(query),
    options
  );
  return {
    ...resp,
    get list() {
      return resp.data?.result?.result?.list ?? [];
    },
  };
}

/// trending

export async function getTopPostsApi(
  query: GetTopPostsQuery,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const url = `${API_ENDPOINTS.POSTS.GET_TOP_POSTS}?duration=${query.duration}`;
  console.log(url);
  const response = await apiClient.get(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<GetTopPostsRespSchema>>();
  return { result };
}

interface GetTopPostsRespReturnValue {
  result: AppAPI<GetTopPostsRespSchema>;
}

interface GetTopPostsQueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, [string, GetTopPostsQuery]>,
    "queryKey" | "queryFn"
  > {
  initialData?: TQueryFnData | (() => TQueryFnData);
}
export function useGetTopPostsQuery(
  query: GetTopPostsQuery,
  options?: GetTopPostsQueryOptions<
    GetTopPostsRespReturnValue,
    Record<string, any>,
    GetTopPostsRespReturnValue
  >
) {
  const resp = useQuery(
    QUERIES_KEY.POSTS.GET_TOP_POSTS(query.duration) as unknown as [
      string,
      GetTopPostsQuery
    ],
    (_key) => {
      const [_, { duration }] = _key.queryKey;
      return getTopPostsApi({
        duration,
      });
    },
    options
  );
  return {
    ...resp,
    get result() {
      return resp.data?.result?.result;
    },
  };
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

interface PostReturnValue {
  result: AppAPI<PostDetailRespSchema>;
}

interface PostQueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, string[]>,
    "queryKey" | "queryFn"
  > {
  initialData: TQueryFnData | (() => TQueryFnData);
}
export function usePostQuery(
  id?: Nullable<string | number>,
  options?: PostQueryOptions<
    PostReturnValue,
    Record<string, any>,
    PostReturnValue
  >
) {
  const resp = useQuery(
    QUERIES_KEY.POSTS.ID(id),
    (_key) => {
      return getPostApi(_key.queryKey[1]);
    },
    options
  );
  return {
    ...resp,
    get result() {
      return resp.data?.result?.result;
    },
  };
}
