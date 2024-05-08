import type { QueryFunction, QueryKey } from "@tanstack/react-query";
import type { SearchParams } from "~/.server/utils/request.server";

type GetPathFn = (searchParams?: SearchParams, pageNo?: number) => string;

type Options = { originUrl?: string };

export const getInfinityQueryFn = <D, Q extends QueryKey>(
  getPath: GetPathFn,
  opts?: Options
): QueryFunction<D, Q, number> => {
  return async (ctx) => {
    const lastKey = ctx.queryKey.at(-1) as SearchParams;
    const url = opts?.originUrl
      ? new URL(getPath(lastKey, ctx.pageParam), opts.originUrl)
      : getPath(lastKey, ctx.pageParam);
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json<D>();
    return data;
  };
};
