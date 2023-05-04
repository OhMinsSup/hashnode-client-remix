export const noopPromiseResponse = (data: any) => {
  return Promise.resolve({
    json: {
      message: undefined,
      result: data,
      resultCode: 0,
      error: undefined,
    },
  });
};
