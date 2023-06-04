import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }
  let keyword = undefined;
  if (params.keyword) {
    keyword = params.keyword;
  }
  const args = {
    cursor,
    limit,
    ...(keyword && { keyword }),
  } as const;

  const { json: resp } = await context.api.draft.getDrafts(request, args);

  const data = resp?.result ?? {
    list: [],
    totalCount: 0,
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
  };

  return json(data);
};

export type LoadTagsLoader = typeof loader;
