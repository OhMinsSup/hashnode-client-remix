import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useQuery } from "@tanstack/react-query";
import { requireCookie } from "~/.server/utils/auth.server";
import { getQueryPath } from "~/services/libs";
import { getQueryFn } from "~/services/react-query/function";

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<Record<string, unknown>>
>;

type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

type QueryKey = [string, SearchParams];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { cookie } = requireCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: null,
        errors: null,
        message: "로그인이 필요합니다.",
      },
      {
        status: 401,
      }
    );
  }

  // const response = await context.agent.api.app. .api.getNotificationCountHandler({
  //   headers: {
  //     Cookie: cookie,
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data: Awaited<Data> = await response.body;
  // return json(data, {
  //   headers: {
  //     "Cache-Control": "public, max-age=120, immutable",
  //   },
  // });
  return json(
    {
      status: "error" as const,
      result: null,
      errors: null,
      message: "로그인이 필요합니다.",
    },
    {
      status: 401,
    }
  );
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/notifications/count";

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

interface UseNotificationCountQueryParams {
  initialData?: Data;
  searchParams?: SearchParams;
  enabled?: boolean;
}

export function useNotificationCountQuery({
  initialData,
  searchParams,
  enabled = true,
}: UseNotificationCountQueryParams) {
  const queryKey: QueryKey = [getBasePath, searchParams];

  return useQuery({
    queryKey,
    enabled,
    queryFn: getQueryFn(getPath),
    initialData,
    staleTime: 2 * 60 * 1000,
  });
}
