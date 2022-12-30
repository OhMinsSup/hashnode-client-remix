import { useQuery } from "@tanstack/react-query";
import { getTopPostsApi } from "../posts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetTopPostsRespSchema } from "../../schema/resp";
import type { AppAPI } from "../../schema/api";
import type { GetTopPostsQuery } from "../../schema/query";
import type { UseQueryOptions } from "@tanstack/react-query";

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
