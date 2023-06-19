import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { TagListRespSchema } from "~/api/schema/resp";

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
  let name = undefined;
  if (params.name) {
    name = params.name;
  }

  const args = {
    cursor,
    limit,
    type: "recent",
    ...(name && { name }),
  } as const;

  const { json: resp } = await context.api.tag.getTagList(request, args);

  const data = resp?.result ?? {
    list: [],
    totalCount: 0,
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
  } as TagListRespSchema;

  return json(data);
};

export type LoadTagsLoader = typeof loader;
