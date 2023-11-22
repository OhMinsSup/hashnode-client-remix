export type Nullable<T> = T | null;

export type Body = BodyInit | Record<string, any> | null | undefined;

export type AppAPI<Data = any> = {
  resultCode: number;
  message: Nullable<string | string[]> | undefined;
  error: Nullable<string> | undefined;
  result: Data;
};

export type ErrorAPI<Data = any> = {
  resultCode: number;
  message: string | string[];
  error: string;
  result: Data | null;
};

export type Flag = {
  v1?: boolean;
};

export type ApiRoutes = URL | RequestInfo;

export type ApiCustomOptions = {
  flag?: Flag;
  withAuthorization?: boolean;
};

export type ApiOptions = {
  requestInit?: RequestInit;
  request?: Request;
  customOptions?: ApiCustomOptions;
};
