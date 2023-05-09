import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPostListApi } from "../my-posts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetMyPostListApiSearchParams } from "../my-posts";
import type { PostListRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

export interface ReturnValue {
  result: AppAPI<PostListRespSchema>;
}

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, unknown, string[]>,
    "queryKey" | "queryFn" | "initialData"
  > {
  initialData?: TQueryFnData | (() => TQueryFnData);
}
export function useGetMyPostsQuery(
  query?: GetMyPostListApiSearchParams,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
) {
  const resp = useInfiniteQuery(
    QUERIES_KEY.POSTS.GET_MY_POSTS(query),
    async ({ pageParam = 0 }) => {
      const { json: data } = await getMyPostListApi({
        cursor: pageParam,
        ...(query?.limit && { limit: query.limit }),
      });
      return data.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );
  return resp;
}
