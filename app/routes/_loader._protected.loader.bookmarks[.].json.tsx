import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";

// constants
import { RESULT_CODE } from "~/constants/constant";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { PostListRespSchema } from "~/api/schema/resp";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const args = {
    cursor,
    limit,
  } as const;

  try {
    const { json: data } = await context.api.item.getLikeItems(request, args);

    if (data.resultCode !== RESULT_CODE.OK) {
      return json({
        list: [],
        totalCount: 0,
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      } as PostListRespSchema);
    }

    return json(data.result);
  } catch (error) {
    return json({
      list: [],
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    } as PostListRespSchema);
  }
};

export type Loader = typeof loader;

export const getPath = (params?: Record<string, any>) => {
  const _base = "/loader/get-like-items.json";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};
