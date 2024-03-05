import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";
import { parseUrlParams } from "~/utils/util";
import {
  type QueryFunction,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<SerializeSchema.SerializeTagCount>
>;

type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

type QueryKey = [string, SearchParams];

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const params = parseUrlParams(request.url);
  const cookie = readHeaderCookie(request);
  const response = await context.api.getTagListHandler(params, {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  });
  const data: Awaited<Data> = await response.body;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120, immutable",
    },
  });
};

export type RoutesLoaderData = typeof loader;

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `/api/v1/tags.json?${query}`;
    }
  }
  return `/api/v1/tags.json`;
};

interface UseTagListInfiniteQueryParams {
  initialData?: Data;
  searchParams?: SearchParams;
  enabled?: boolean;
}

export function useTagListInfiniteQuery({
  initialData,
  searchParams,
  enabled = true,
}: UseTagListInfiniteQueryParams) {
  const queryKey: QueryKey = [getPath(), searchParams];

  const queryFn: QueryFunction<Data, QueryKey, string> = async (ctx) => {
    const lastKey = ctx.queryKey.at(-1);
    const response = await fetch(getPath(lastKey));
    const data = await response.json<Data>();
    return data;
  };

  return useInfiniteQuery({
    queryKey,
    queryFn,
    enabled,
    // @ts-expect-error - This is a bug in react-query types
    initialData: initialData
      ? () => ({ pageParams: [null], pages: [initialData] })
      : undefined,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.result?.pageInfo;
      if (pageInfo?.hasNextPage) {
        return pageInfo.endCursor;
      }
      return null;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useTagListQuery({
  initialData,
  searchParams,
  enabled = true,
}: UseTagListInfiniteQueryParams) {
  const queryKey: QueryKey = [getPath(), searchParams];

  return useQuery({
    queryKey,
    enabled,
    queryFn: async (ctx) => {
      const response = await fetch(getPath(ctx.queryKey.at(-1)));
      const data = await response.json<Data>();
      return data;
    },
    initialData,
    staleTime: 2 * 60 * 1000,
  });
}
