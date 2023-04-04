import { useInfiniteQuery } from "@tanstack/react-query";
import { getImageFilesApi } from "../files";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetImageFilesApiSearchParams } from "../files";
import type { GetTopPostsRespSchema } from "~/api/schema/resp";
import type { AppAPI } from "~/api/schema/api";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

export interface ReturnValue {
  result: AppAPI<GetTopPostsRespSchema>;
}

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, unknown, string[]>,
    "queryKey" | "queryFn" | "initialData"
  > {
  initialData?: TQueryFnData | (() => TQueryFnData);
}
export function useImageFilesQuery(
  query?: GetImageFilesApiSearchParams,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
) {
  const resp = useInfiniteQuery(
    QUERIES_KEY.FILE.ROOT,
    async ({ pageParam = 0 }) => {
      const { result } = await getImageFilesApi({
        cursor: pageParam,
        ...(query?.limit && { limit: query.limit }),
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );
  return resp;
}
