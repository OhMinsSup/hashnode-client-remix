import { json } from "@remix-run/cloudflare";
import { type QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  type SearchParams,
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";

type Data = FetchRespSchema.ListResp<SerializeSchema.SerializeFile>;

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
  const response = await context.agent.api.app.file.getFilesHandler<DataSchema>(
    {
      headers: {
        Cookie: cookie,
      },
      query,
    }
  );

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

export const getBasePath = "/api/v1/assets/files";

export const getPath = (searchParams?: SearchParams, pageNo?: number) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    if (pageNo) {
      params.set("pageNo", String(pageNo));
    }
    return `${getBasePath}?${params.toString()}`;
  }

  if (pageNo) {
    const params = new URLSearchParams();
    params.set("pageNo", String(pageNo));
    return `${getBasePath}?${params.toString()}`;
  }

  return getBasePath;
};

type QueryKey = [string, SearchParams];

interface UseAssetFileListInfiniteQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function useAssetFileListInfiniteQuery(
  opts?: UseAssetFileListInfiniteQueryParams
) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];

  const queryFn: QueryFunction<DataSchema, QueryKey, number> = async (ctx) => {
    const lastKey = ctx.queryKey.at(-1);
    const url = opts?.originUrl
      ? new URL(getPath(lastKey, ctx.pageParam), opts.originUrl)
      : getPath(lastKey, ctx.pageParam);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json<DataSchema>();
    return data;
  };

  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
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
