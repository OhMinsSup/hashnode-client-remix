import type { QueryFunction, QueryKey } from '@tanstack/react-query';

import type { SearchParams } from '~/.server/utils/request.server';

type GetPathFn = (searchParams?: SearchParams, pageNo?: number) => string;

type Options = { originUrl?: string };

export const getInfinityQueryFn = <D, Q extends QueryKey>(
  getPath: GetPathFn,
  opts?: Options,
): QueryFunction<D, Q, number> => {
  return async (ctx) => {
    const lastKey = ctx.queryKey.at(-1) as SearchParams;
    const url = opts?.originUrl
      ? new URL(getPath(lastKey, ctx.pageParam), opts.originUrl)
      : getPath(lastKey, ctx.pageParam);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json<D>();
    return data;
  };
};

export const getQueryFn = <D, Q extends QueryKey>(
  getPath: GetPathFn,
  opts?: Options,
): QueryFunction<D, Q> => {
  return async (ctx) => {
    const lastKey = ctx.queryKey.at(-1) as SearchParams;
    const url = opts?.originUrl
      ? new URL(getPath(lastKey), opts.originUrl)
      : getPath(lastKey);
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json<D>();
    return data;
  };
};

export const getQueryPath = (basePath: string, searchParams?: SearchParams) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    return `${basePath}?${params.toString()}`;
  }
  return basePath;
};

export const getInfinityQueryPath = (
  basePath: string,
  searchParams?: SearchParams,
  pageNo?: number,
) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    if (pageNo) {
      params.set('pageNo', String(pageNo));
    }
    return `${basePath}?${params.toString()}`;
  }

  if (pageNo) {
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    return `${basePath}?${params.toString()}`;
  }

  return basePath;
};

export const getInfinityQueryPathRemixLoader = (
  basePath: string,
  searchParams?: SearchParams,
  pageNo?: number,
) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    if (pageNo) {
      params.set('pageNo', String(pageNo));
    }
    if (basePath.includes('?index')) {
      return `${basePath}&${params.toString()}`;
    }
    return `${basePath}?${params.toString()}`;
  }

  if (pageNo) {
    const params = new URLSearchParams();
    params.set('pageNo', String(pageNo));
    if (basePath.includes('?index')) {
      return `${basePath}&${params.toString()}`;
    }
    return `${basePath}?${params.toString()}`;
  }

  return basePath;
};
