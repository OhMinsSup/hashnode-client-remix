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
