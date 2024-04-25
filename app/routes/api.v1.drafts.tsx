import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { QueryFunction, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";
import { isBrowser } from "~/libs/browser-utils";
import { useMatchesData } from "~/libs/hooks/useMatchesData";

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<SerializeSchema.SerializePost>
>;

export type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

type QueryKey = [string, SearchParams];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const cookie = readHeaderCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: {
          totalCount: 0,
          list: [],
          endCursor: null,
          hasNextPage: false,
        },
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
        result: {
          totalCount: 0,
          list: [],
          endCursor: null,
          hasNextPage: false,
        },
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const response = await context.agent.api.app.draft.getDraftsHandler<Data>({
    headers: {
      Cookie: cookie,
    },
    query: searchParams,
  });

  const data = response._data;
  if (!data || (data && !data.result)) {
    return json({
      status: "error" as const,
      result: {
        totalCount: 0,
        list: [],
        endCursor: null,
        hasNextPage: false,
      },
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

export const getBasePath = "/api/v1/drafts";

export const getOrigiin = (origin: string) => {
  if (isBrowser) {
    return location.origin;
  }
  return origin;
};

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `/api/v1/drafts?${query}`;
    }
  }
  return "/api/v1/drafts";
};

interface UseDraftListInfiniteQueryParams {
  initialData?: Data;
  searchParams?: SearchParams;
}

export function useDraftListInfiniteQuery(
  opts?: UseDraftListInfiniteQueryParams
) {
  const root = useMatchesData("root") as Record<string, string>;
  const origin = getOrigiin(root.origin);
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];

  const queryFn: QueryFunction<Data, QueryKey, string> = async (ctx) => {
    const lastKey = ctx.queryKey.at(-1);
    const response = await fetch(`${origin}${getPath(lastKey)}`);
    const data = await response.json<Data>();
    return data;
  };

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn,
    // @ts-expect-error - This is a bug in react-query types
    initialData: opts?.initialData
      ? () => ({ pageParams: [null], pages: [opts.initialData] })
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
