import { useInfiniteQuery } from '@tanstack/react-query';

import { type SearchParams } from '~/.server/utils/request.server';
import { getInfinityQueryPathRemixLoader } from '~/services/libs';
import { getInfinityQueryFn } from '~/services/react-query';

type QueryKey = [string, SearchParams];

const getBasePath = '/?index';

export const getPath = (searchParams?: SearchParams, pageNo?: number) => {
  return getInfinityQueryPathRemixLoader(getBasePath, searchParams, pageNo);
};

interface UsePostInfiniteQueryParams {
  initialData?: any;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function usePostInfiniteQuery(opts?: UsePostInfiniteQueryParams) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];

  return useInfiniteQuery({
    queryKey,
    queryFn: getInfinityQueryFn(getPath, opts),
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
