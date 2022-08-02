// ================== Common =================== //

export interface ErrorSchema {
  error: string;
  errorCode: number;
}

export type AppAPI<Data = any> = Data;

export type ErrorAPI = ErrorSchema;

export interface Options {
  withAuthorization?: boolean;
}
