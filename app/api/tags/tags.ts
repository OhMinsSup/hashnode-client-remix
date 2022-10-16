import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { API_ENDPOINTS, QUERIES_KEY } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

import type { TagListQuery } from "../schema/query";
import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { TagListRespSchema } from "../schema/resp";

export async function getTagListApi(
  query?: TagListQuery,
  options?: Options
): Promise<ReturnValue> {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }
  if (query?.name) {
    search.set("name", query.name);
  }

  if (query?.type) {
    search.set("type", query.type);
  }

  let url = API_ENDPOINTS.TAGS.ROOT;
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
  const result = await response.json<AppAPI<TagListRespSchema>>();
  return { result };
}

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
    get list() {
      return resp.data?.result?.result?.list ?? [];
    },
  };
}
