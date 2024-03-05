import type {
  FetchHandlerOptions,
  FetchHandlerResponse,
  QueryParams,
} from "../fetch/types";

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, "headers" | "reqBody">
>;

// Auth

export type SignupHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type SigninHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// Users

export type GetMeHandler = (
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type UserUpdateHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type UserDeleteHandler = (
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetUserListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// Posts

export type PostCreateHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type PostUpdateHandler = (
  id: string,
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type PostDeleteHandler = (
  id: string,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetPostHandler = (
  id: string,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetPostListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetTopPostListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetLikePostListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetDraftPostListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// tags

export type GetTagListHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetTagHandler = (
  name: string,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type GetTagIdHandler = (
  id: string,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type PostTagFollowHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// notifications

export type GetNotificationCountHandler = (
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

// files

export type PostCloudflareUploadHandler = (
  uploadUrl: string,
  file: File,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type PostDirectUploadHandler = (
  accountId: string,
  token: string,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;

export type PostFileHandler = (
  body: unknown,
  opts?: CallOptions | undefined
) => Promise<FetchHandlerResponse>;
