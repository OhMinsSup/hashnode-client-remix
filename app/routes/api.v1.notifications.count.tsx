import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";
import { useQuery } from "@tanstack/react-query";

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
  const cookie = readHeaderCookie(request);
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

  const token = getTokenFromCookie(cookie);
  if (!token) {
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

  const response = await context.api.getNotificationCountHandler({
    headers: {
      Cookie: cookie,
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
      return `/api/v1/notifications/count?${query}`;
    }
  }
  return "/api/v1/notifications/count";
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
