import type {
  FetchHandlerOptions,
  FetchHandlerResponse,
  QueryParams,
} from "../fetch/types";

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, "headers" | "reqBody">
>;

export type PostTestHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetTestHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;
