import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  getTokenFromCookie,
  readHeaderCookie,
} from "~/.server/utils/request.server";

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<SerializeSchema.SerializePost>
>;

const _defaultList: FetchRespSchema.ListResp<SerializeSchema.SerializePost> = {
  totalCount: 0,
  list: [],
  pageInfo: {
    currentPage: 1,
    hasNextPage: false,
    nextPage: null,
  },
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const cookie = readHeaderCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: _defaultList,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const token = getTokenFromCookie(cookie);
  if (!token) {
    return json(
      {
        status: "error" as const,
        result: _defaultList,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = Object.fromEntries(searchParams.entries());
  const response =
    await context.agent.api.app.draft.getSubmittedDraftsHandler<Data>({
      headers: {
        Cookie: cookie,
      },
      query,
    });

  const data = response._data;
  if (!data || (data && !data.result)) {
    return json({
      status: "error" as const,
      result: _defaultList,
      message: "Failed to get drafts.",
    });
  }

  return json({
    status: "success" as const,
    result: data.result,
    message: null,
  });
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = "/api/v1/drafts/submitted";

export type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `${getBasePath}?${query}`;
    }
  }
  return getBasePath;
};
