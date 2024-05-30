import { useSuspenseQuery } from '@tanstack/react-query';

import { API_ENDPOINTS } from '~/constants/constant';
import { getQueryFn, getQueryPath } from '~/services/react-query';
import { sharedQueryKey } from '~/services/react-query/shared';
import { useEnvStore } from '~/services/store/env-store-provider';

type Data = SerializeSchema.SerializePost<false>;

type DataList = FetchRespSchema.ListResp<Data>;

type DataSchema = FetchRespSchema.Success<DataList>;

type Params = {
  initialData?: DataSchema;
  searchParams?: UntilsTypes.SearchParams;
};

export function usePostTrendingQuery({ initialData, searchParams }: Params) {
  const getApiHost = useEnvStore((state) => state.getApiHost);
  const queryKey: QueriesTypes.BaseQueryKey = [
    sharedQueryKey,
    usePostTrendingQuery.name,
    searchParams,
  ];

  const getPath = (searchParams?: UntilsTypes.SearchParams) => {
    console.log('searchParams', searchParams);
    return getQueryPath(API_ENDPOINTS.POSTS.TRENDING, searchParams);
  };

  return useSuspenseQuery({
    queryKey,
    queryFn: getQueryFn(getPath, {
      options: {
        baseURL: getApiHost(),
        credentials: 'include',
        onRequest: (req) => {
          console.log('req', req);
        },
      },
    }),
    initialData,
  });
}
