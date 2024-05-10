export const defaultPaginationResponse = <
  D = any,
>(): FetchRespSchema.ListResp<D> => {
  return {
    totalCount: 0,
    list: [],
    pageInfo: {
      currentPage: 1,
      hasNextPage: false,
      nextPage: null,
    },
  };
};

export const successJsonResponse = <D = unknown>(
  data: D,
): RemixDataFlow.Response<D, null> => {
  return {
    status: 'success' as const,
    result: data,
    message: null,
    errors: null,
  };
};

export const errorJsonResponse = <E = unknown>(
  message?: string,
  errors?: E,
): RemixDataFlow.Response<null, E | null> => {
  return {
    status: 'error' as const,
    result: null,
    message: message ?? null,
    errors: errors ?? null,
  };
};

export const errorJsonDataResponse = <D = unknown>(
  data: D,
  message?: string,
): RemixDataFlow.Response<D, null> => {
  return {
    status: 'error' as const,
    result: data,
    message: message ?? null,
    errors: null,
  };
};
