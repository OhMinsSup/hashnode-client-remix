import { json } from "@remix-run/cloudflare";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  type SearchParams,
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";
import { getInfinityQueryPath } from "~/services/libs";
import { getInfinityQueryFn } from "~/services/react-query/function";

type Data = FetchRespSchema.ListResp<SerializeSchema.SerializePost<false>>;

type DataSchema = FetchRespSchema.Success<Data>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const _defaultList: Data = {
    totalCount: 0,
    list: [],
    pageInfo: {
      currentPage: 1,
      hasNextPage: false,
      nextPage: null,
    },
  };

  const cookie = readHeaderCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: _defaultList,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const token = getTokenFromCookie(cookie);
  if (!token) {
    return json(
      {
        status: "error" as const,
        result: _defaultList,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = Object.fromEntries(searchParams.entries());
  const response =
    await context.agent.api.app.draft.getDraftsHandler<DataSchema>({
      headers: {
        Cookie: cookie,
      },
      query,
    });

  const data = response._data;
  if (!data || (data && !data.result)) {
    return json({
      status: "error" as const,
      result: _defaultList,
      message: "Failed to get asset files.",
    });
  }

  return json({
    status: "success" as const,
    result: data.result,
    message: null,
  });
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/drafts";

export const getPath = (searchParams?: SearchParams, pageNo?: number) => {
  return getInfinityQueryPath(getBasePath, searchParams, pageNo);
};

type QueryKey = [string, SearchParams];

interface UseDraftInfiniteQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function useDraftInfiniteQuery(opts?: UseDraftInfiniteQueryParams) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: getInfinityQueryFn(getPath, opts),
    initialPageParam: 1,
    refetchOnMount: "always",
    // @ts-expect-error - This is a bug in react-query types
    initialData: opts?.initialData
      ? () => ({ pageParams: [undefined], pages: [opts.initialData] })
      : undefined,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.result?.pageInfo;
      if (pageInfo?.hasNextPage) {
        return pageInfo.nextPage;
      }
      return undefined;
    },
  });
}
