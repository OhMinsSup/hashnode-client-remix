import type { AxiosRequestConfig } from "axios";

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

export interface Params<Body = any> {
  url: string;
  body?: Body;
  config?: AxiosRequestConfig | undefined;
  options?: Options;
}
