import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERIES_KEY } from "~/constants/constant";

import { getTagListApi } from "~/api/tags/tags";

import type { AppAPI } from "~/api/schema/api";
import type { TagListQuery } from "~/api/schema/query";
import type { TagListRespSchema } from "~/api/schema/resp";

interface ReturnValue {
  result: AppAPI<TagListRespSchema>;
}

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, string[]>,
    "queryKey" | "queryFn"
  > {
  initialData: TQueryFnData | (() => TQueryFnData);
}
export function useTagQuery(
  query?: TagListQuery,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
) {
  const resp = useQuery(
    QUERIES_KEY.TAGS.ROOT(query?.name, query?.type),
    (_key) => getTagListApi(query),
    options
  );

  return {
    ...resp,
  };
}
