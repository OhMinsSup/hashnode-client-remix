import { useInfiniteQuery } from "@tanstack/react-query";
import { getImageFilesApi } from "../images";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { GetImageFilesApiSearchParams } from "../images";
import type { FileListRespSchema } from "~/api/schema/resp";
import type { UseInfiniteQueryOptions } from "@tanstack/react-query";

type ReturnValue = FileListRespSchema;

type QueryKey = string[];

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

export function useImageFilesQuery(
  query?: GetImageFilesApiSearchParams,
  options?: QueryOptions<ReturnValue, unknown, ReturnValue>
) {
  const resp = useInfiniteQuery(
    QUERIES_KEY.FILE.ROOT,
    async ({ pageParam = 0 }) => {
      const { json: data } = await getImageFilesApi({
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
