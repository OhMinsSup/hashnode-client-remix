import { json } from "@remix-run/cloudflare";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type SearchParams } from "~/.server/utils/request.server";
import { getQueryPath, parseUrlParams } from "~/services/libs";
import { getQueryFn } from "~/services/react-query/function";
import { requireCookie } from "~/.server/utils/auth.server";

export type Data = SerializeSchema.SerializeTag<false>;

export type DataList = Data[];

export type DataSchema = FetchRespSchema.Success<DataList>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { cookie } = requireCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: [] as DataList,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const tag = context.agent.api.app.tag;

  const response = await tag.getWidgetHandler<DataSchema>({
    headers: {
      Cookie: cookie,
    },
    query: parseUrlParams(request.url),
  });

  const data = response._data;
  if (!data || (data && !data.result)) {
    return json({
      status: "error" as const,
      result: [] as DataList,
      message: "Failed to get asset tags.",
    });
  }

  return json({
    status: "success" as const,
    result: data.result,
    message: null,
  });
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/tags/widget";

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

type QueryKey = [string, SearchParams];

interface UseTagWidgetQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function useTagWidgetQuery(opts?: UseTagWidgetQueryParams) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];
  return useSuspenseQuery({
    queryKey,
    queryFn: getQueryFn<DataSchema, QueryKey>(getPath, opts),
  });
}
