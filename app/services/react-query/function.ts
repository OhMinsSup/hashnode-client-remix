import type { QueryFunction, QueryKey } from '@tanstack/react-query';

import { fetchHandler } from '~/services/api/fetch';
import { type FetchOptions } from '../api/fetch/types';

type GetPathFn = (
  searchParams?: UntilsTypes.SearchParams,
  pageNo?: number,
) => string;

type Options = { options?: FetchOptions<'json'> };

export const getInfinityQueryFn = <D, Q extends QueryKey>(
  getPath: GetPathFn,
  opts?: Options,
): QueryFunction<D, Q, number> => {
  return async (ctx) => {
    const lastKey = ctx.queryKey.at(-1) as UntilsTypes.SearchParams;
    const url = getPath(lastKey, ctx.pageParam);
    const response = await fetchHandler<D>(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(opts && { ...opts.options }),
    });
    return response._data as D;
  };
};

export const getQueryFn = <D, Q extends QueryKey>(
  getPath: GetPathFn,
  opts?: Options,
): QueryFunction<D, Q> => {
  return async (ctx) => {
    const lastKey = ctx.queryKey.at(-1) as UntilsTypes.SearchParams;
    const url = getPath(lastKey);
    const response = await fetchHandler<D>(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(opts && { ...opts.options }),
    });
    return response._data as D;
  };
};

export const getQueryPath = (
  basePath: string,
  searchParams?: UntilsTypes.SearchParams,
) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    return `${basePath}?${params.toString()}`;
  }
  return basePath;
};

export const getInfinityQueryPath = (
  basePath: string,
  searchParams?: UntilsTypes.SearchParams,
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
  searchParams?: UntilsTypes.SearchParams,
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
