import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/.server/utils/request.server";
import { parseUrlParams } from "~/utils/util";
import { type QueryFunction, useQuery } from "@tanstack/react-query";
import take from "lodash-es/take";

type Data = FetchRespSchema.Success<{
  posts: FetchRespSchema.PostDetailResp[];
}>;

type QueryKey = [string, { duration: string | number }];

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const params = parseUrlParams(request.url);
  const cookie = readHeaderCookie(request);
  const response = await context.api.getTopPostListHandler(params, {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  });
  const data = await response.body;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120, immutable",
    },
  });
};

export type RoutesLoaderData = typeof loader;

export const getPath = (duration: number | string) =>
  `/api/v1/posts/top.json?duration=${duration}`;

interface UseTopPostInfiniteQueryParams {
  initialData?: Data;
  duration: string | number;
}

export function useTopPostQuery({
  initialData,
  duration,
}: UseTopPostInfiniteQueryParams) {
  const queryKey: QueryKey = [getPath(duration), { duration }];

  const queryFn: QueryFunction<Data, QueryKey> = async () => {
    const response = await fetch(getPath(duration));
    return response.json<Data>();
  };

  return useQuery({
    queryKey,
    queryFn,
    initialData,
    select: (data) => {
      const initList = data.result.posts ?? [];
      return take(initList, 5);
    },
  });
}
