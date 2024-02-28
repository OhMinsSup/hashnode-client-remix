import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";
import { parseUrlParams } from "~/utils/util";
import { type QueryFunction, useInfiniteQuery } from "@tanstack/react-query";

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<FetchRespSchema.PostDetailResp>
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
  const response = await context.api.getPostListHandler(params, {
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
      return `/api/v1/posts.json?${query}`;
    }
  }
  return `/api/v1/posts.json`;
};

interface UsePostListInfiniteQueryParams {
  initialData?: Data;
  searchParams?: SearchParams;
}

export function usePostListInfiniteQuery({
  initialData,
  searchParams,
}: UsePostListInfiniteQueryParams) {
  const queryKey: QueryKey = [getPath(), searchParams];

  const queryFn: QueryFunction<Data, QueryKey, string> = async (ctx) => {
    const lastKey = ctx.queryKey.at(-1);
    const response = await fetch(getPath(lastKey));
    const data =
      await response.json<
        Awaited<
          FetchRespSchema.Success<
            FetchRespSchema.ListResp<FetchRespSchema.PostDetailResp>
          >
        >
      >();
    return data;
  };

  return useInfiniteQuery({
    queryKey,
    queryFn,
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
  });
}
