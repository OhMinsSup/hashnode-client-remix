import { useSuspenseQuery } from '@tanstack/react-query';

import { API_ENDPOINTS } from '~/constants/constant';
import { getQueryFn, getQueryPath } from '~/services/react-query';
import { sharedQueryKey } from '~/services/react-query/shared';
import { useEnvStore } from '~/services/store/env-store-provider';

export type Data = SerializeSchema.SerializeTag<false>;

export type DataList = Data[];

export type DataSchema = FetchRespSchema.Success<DataList>;

type Params = {
  initialData?: DataSchema;
  searchParams?: UntilsTypes.SearchParams;
};

export function useWidgetTagQuery({ initialData, searchParams }: Params) {
  const getApiHost = useEnvStore((state) => state.getApiHost);
  const queryKey: QueriesTypes.BaseQueryKey = [
    sharedQueryKey,
    useWidgetTagQuery.name,
    searchParams,
  ];

  const getPath = (searchParams?: UntilsTypes.SearchParams) => {
    return getQueryPath(API_ENDPOINTS.TAGS.WIDGET, searchParams);
  };

  return useSuspenseQuery({
    queryKey,
    initialData,
    queryFn: getQueryFn<DataSchema, QueriesTypes.BaseQueryKey>(getPath, {
      options: {
        baseURL: getApiHost(),
        credentials: 'include',
      },
    }),
  });
}
