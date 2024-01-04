export interface FetchHandlerResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

export interface FetchHandlerOptions {
  uri: string;
  method: string;
  headers: Headers | Record<string, string> | undefined;
  reqBody: unknown;
}

export enum ResponseType {
  Unknown = 1,
  InvalidResponse = 2,
  Success = 200,
  InvalidRequest = 400,
  AuthRequired = 401,
  Forbidden = 403,
  NotFound = 404,
  PayloadTooLarge = 413,
  RateLimitExceeded = 429,
  InternalServerError = 500,
  MethodNotImplemented = 501,
  UpstreamFailure = 502,
  NotEnoughResources = 503,
  UpstreamTimeout = 504,
}

export type QueryParams = Record<string, any> | URLSearchParams;
