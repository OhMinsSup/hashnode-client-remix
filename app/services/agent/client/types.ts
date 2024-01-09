import type { FetchHandlerOptions, FetchHandlerResponse } from "../fetch/types";

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, "headers" | "reqBody">
>;

export type SignupHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type SigninHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;
