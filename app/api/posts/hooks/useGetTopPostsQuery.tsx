import { useQuery } from "@tanstack/react-query";
import { getTopPostsApi } from "../posts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetTopPostsRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";
import type { GetTopPostsQuery } from "~/api/schema/query";
import type { UseQueryOptions } from "@tanstack/react-query";

export interface ReturnValue {
  result: AppAPI<GetTopPostsRespSchema>;
}

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, [string, GetTopPostsQuery]>,
    "queryKey" | "queryFn"
  > {
  initialData?: TQueryFnData | (() => TQueryFnData);
}
export function useGetTopPostsQuery(
  query: GetTopPostsQuery,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
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
  return resp;
}
