import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPostListApi } from "../my-posts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetMyPostListApiSearchParams } from "../my-posts";
import type { PostListRespSchema } from "~/api/schema/resp";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

type ReturnValue = PostListRespSchema;

type QueryKey = ReturnType<typeof QUERIES_KEY.POSTS.GET_MY_POSTS>;

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      QueryKey
    >,
    "queryKey" | "queryFn"
  > {}

export function useGetMyPostsQuery(
  query?: GetMyPostListApiSearchParams,
  options?: QueryOptions<ReturnValue, unknown, ReturnValue>
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
      ...options,
    }
  );
  return resp;
}
