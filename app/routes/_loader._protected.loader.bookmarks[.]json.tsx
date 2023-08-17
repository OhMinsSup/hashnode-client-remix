import { json } from "@remix-run/cloudflare";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { PostListRespSchema } from "~/api/schema/resp";

export const loader = async ({ context, request }: LoaderArgs) => {
  const response = await context.api.item.getItemsByLikeList(request);
  return json<PostListRespSchema>(response);
};

export type Loader = typeof loader;

export const getPath = (params?: Record<string, any>) => {
  const _base = "/loader/bookmarks.json";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};
