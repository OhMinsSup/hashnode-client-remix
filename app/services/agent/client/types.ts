import type { FetchHandlerOptions, FetchHandlerResponse } from "../fetch/types";

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, "headers" | "reqBody">
>;

// Auth

export type SignupHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type SigninHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// Users

export type GetMeHandler = (
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type UserUpdateHandler = (
  body: any,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type UserDeleteHandler = (
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;
