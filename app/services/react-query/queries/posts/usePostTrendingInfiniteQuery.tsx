import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { API_ENDPOINTS } from '~/constants/constant';
import {
  getInfinityQueryFn,
  getInfinityQueryPath,
} from '~/services/react-query';
import { sharedQueryKey } from '~/services/react-query/shared';
import { useEnvStore } from '~/services/store/env-store-provider';

type Data = SerializeSchema.SerializePost<false>;

type DataList = FetchRespSchema.ListResp<Data>;

type DataSchema = FetchRespSchema.Success<DataList>;

type Params = {
  initialData?: DataSchema;
  searchParams?: UntilsTypes.SearchParams;
};

export function usePostTrendingInfiniteQuery({
  initialData,
  searchParams,
}: Params) {
  const getApiHost = useEnvStore((state) => state.getApiHost);
  const queryKey: QueriesTypes.BaseQueryKey = [
    sharedQueryKey,
    usePostTrendingInfiniteQuery.name,
    searchParams,
  ];

  const getPath = (
    searchParams?: UntilsTypes.SearchParams,
    pageNo?: number,
  ) => {
    return getInfinityQueryPath(
      API_ENDPOINTS.POSTS.TRENDING,
      searchParams,
      pageNo,
    );
  };

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: getInfinityQueryFn(getPath, {
      options: {
        baseURL: getApiHost(),
        credentials: 'include',
      },
    }),
    initialPageParam: 1,
    // @ts-expect-error - This is a bug in react-query types
    initialData: initialData
      ? () => ({ pageParams: [undefined], pages: [initialData] })
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
