// ================== Common =================== //

export type Nullable<T> = T | null;

export type AppAPI<Data = any> = {
  resultCode: number;
  message: Nullable<string | string[]> | undefined;
  error: Nullable<string> | undefined;
  result: Data;
};

export type ErrorAPI = {
  resultCode: number;
  message: string | string[];
  error: string;
  result: null;
};

export interface Options {
  withAuthorization?: boolean;
}
