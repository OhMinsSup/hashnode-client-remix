export type ResponseType = keyof ResponseMap | 'json';

export type MappedResponseType<
  R extends ResponseType,
  JsonType = any,
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export type Params = Record<string, unknown>;

export type QueryParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type FetchRequest = RequestInfo;

export interface FetchResponse<T> extends Response {
  _data?: T;
}

export interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  turbo: ReadableStream<Uint8Array>;
}

export type ResponseMapType = keyof ResponseMap | 'json';

export interface FetchContext<
  T = unknown,
  R extends ResponseMapType = ResponseMapType,
> {
  request: FetchRequest;
  options: FetchOptions<R>;
  response?: FetchResponse<T>;
  error?: Error;
}

export interface FetchOptions<R extends ResponseMapType = ResponseMapType>
  extends Omit<RequestInit, 'body'> {
  isSingleFetch?: boolean;

  baseURL?: string;
  body?: RequestInit['body'] | Params;
  params?: Params;
  query?: QueryParams;
  ignoreResponseError?: boolean;
  parseResponse?: (responseText: string) => unknown;
  responseType?: R;

  /** timeout in milliseconds */
  timeout?: number;

  retry?: number | false;
  /** Delay between retries in milliseconds. */
  retryDelay?: number;
  /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
  retryStatusCodes?: number[];

  onRequest?: <T = any>(context: FetchContext<T, R>) => Promise<void> | void;

  onRequestError?: <T = any>(
    context: FetchContext<T, R> & { error: Error },
  ) => Promise<void> | void;

  onResponse?: <T = any>(
    context: FetchContext<T, R> & { response: FetchResponse<R> },
  ) => Promise<void> | void;

  onResponseError?: <T = any>(
    context: FetchContext<T, R> & { response: FetchResponse<R> },
  ) => Promise<void> | void;
}

export type FetchHandler = <T = any, R extends ResponseType = 'json'>(
  request: FetchRequest,
  options?: FetchOptions<R>,
) => Promise<FetchResponse<MappedResponseType<R, T>>>;

export type FetchWithoutRequestHandler = <
  T = any,
  R extends ResponseType = 'json',
>(
  options?: FetchOptions<R>,
) => Promise<FetchResponse<MappedResponseType<R, T>>>;

// eslint-disable-next-line @typescript-eslint/naming-convention -- FetchError is a class
export interface IFetchError<T = any> extends Error {
  request?: FetchRequest;
  options?: FetchOptions;
  response?: FetchResponse<T>;
  data?: T;
  status?: number;
  statusText?: string;
  statusCode?: number;
  statusMessage?: string;
}

export interface AgentConfigureOptions {
  fetch: FetchHandler;
}

export interface AgentOpts {
  service: string | URL;
  prefix?: string;
}
