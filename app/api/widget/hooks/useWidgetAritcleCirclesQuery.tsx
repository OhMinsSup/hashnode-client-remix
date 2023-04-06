import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERIES_KEY } from "~/constants/constant";

import { getAritcleCirclesApi } from "~/api/widget/widget";

import type { AppAPI } from "~/api/schema/api";
import type { GetAritcleCirclesRespSchema } from "~/api/schema/resp";
import type { GetWidgetBookmarksApiSearchParams } from "../widget";

interface ReturnValue {
  result: AppAPI<GetAritcleCirclesRespSchema>;
}

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<
      TQueryFnData,
      TError,
      TData,
      string[] | [string, { userId: string }]
    >,
    "queryKey" | "queryFn"
  > {
  initialData?: TQueryFnData | (() => TQueryFnData);
}
export function useWidgetAritcleCirclesQuery(
  query?: GetWidgetBookmarksApiSearchParams,
  options?: QueryOptions<ReturnValue, Record<string, any>, ReturnValue>
) {
  const resp = useQuery(
    QUERIES_KEY.WIDGET.ARTICLE_CIRCLES(query),
    (_key) => getAritcleCirclesApi(query),
    options
  );

  return resp;
}
