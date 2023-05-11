import { useQuery } from "@tanstack/react-query";
import { getTopPostsApi } from "../top-posts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetTopPostsRespSchema } from "~/api/schema/resp";
import type { GetTopPostsQuery } from "~/api/schema/query";
import type { UseQueryOptions } from "@tanstack/react-query";

type ReturnValue = GetTopPostsRespSchema;

type QueryKey = ReturnType<typeof QUERIES_KEY.POSTS.GET_TOP_POSTS>;

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  > {}

export function useGetTopPostsQuery(
  query: GetTopPostsQuery,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
) {
  const resp = useQuery(
    QUERIES_KEY.POSTS.GET_TOP_POSTS(query.duration),
    async (_key) => {
      const [, { duration }] = _key.queryKey;
      const { json } = await getTopPostsApi({
        duration,
      });
      return json.result;
    },
    options
  );
  return resp;
}
