import { json } from "@remix-run/cloudflare";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type SearchParams } from "~/.server/utils/request.server";
import { getInfinityQueryPath, parseUrlParams } from "~/services/libs";
import { getInfinityQueryFn } from "~/services/react-query/function";
import { requireCookie } from "~/.server/utils/auth.server";
import { defaultPaginationResponse } from "~/.server/utils/response.server";

type Data = SerializeSchema.SerializePost<false>;

type DataList = FetchRespSchema.ListResp<SerializeSchema.SerializePost<false>>;

type DataSchema = FetchRespSchema.Success<DataList>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { cookie } = requireCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: defaultPaginationResponse<Data>(),
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const post = context.agent.api.app.post;

  const response = await post.getPublishedHandler<DataSchema>({
    headers: {
      Cookie: cookie,
    },
    query: parseUrlParams(request.url),
  });

  const data = response._data;
  if (!data || (data && !data.result)) {
    return json({
      status: "error" as const,
      result: defaultPaginationResponse<Data>(),
      message: "Failed to get asset posts published.",
    });
  }

  return json({
    status: "success" as const,
    result: data.result,
    message: null,
  });
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/posts/published";

export const getPath = (searchParams?: SearchParams, pageNo?: number) => {
  return getInfinityQueryPath(getBasePath, searchParams, pageNo);
};

type QueryKey = [string, SearchParams];

interface UsePostPublishedInfiniteQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function usePostPublishedInfiniteQuery(
  opts?: UsePostPublishedInfiniteQueryParams
) {
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
