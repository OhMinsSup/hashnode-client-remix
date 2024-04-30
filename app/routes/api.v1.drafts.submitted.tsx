import { json } from "@remix-run/cloudflare";
import { type QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";

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
    await context.agent.api.app.draft.getSubmittedDraftsHandler<DataSchema>({
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
      message: "Failed to get drafts.",
    });
  }

  return json({
    status: "success" as const,
    result: data.result,
    message: null,
  });
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/drafts/submitted";

export type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `${getBasePath}?${query}`;
    }
  }
  return getBasePath;
};

type QueryKey = [string, SearchParams];

interface UseSubmittedDraftListInfiniteQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function useSubmittedDraftListInfiniteQuery(
  opts?: UseSubmittedDraftListInfiniteQueryParams
) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];

  const queryFn: QueryFunction<DataSchema, QueryKey, number> = async (ctx) => {
    const lastKey = ctx.queryKey.at(-1);
    const url = opts?.originUrl
      ? new URL(getPath(lastKey), opts.originUrl)
      : getPath(lastKey);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json<DataSchema>();
    return data;
  };

  return useInfiniteQuery({
    queryKey,
    queryFn,
    // @ts-expect-error - This is a bug in react-query types
    initialData: opts?.initialData
      ? () => ({ pageParams: [null], pages: [opts.initialData] })
      : undefined,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.result?.pageInfo;
      if (pageInfo?.hasNextPage) {
        return pageInfo.nextPage;
      }
      return null;
    },
  });
}
