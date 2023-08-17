import { json } from "@remix-run/cloudflare";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { TagListRespSchema } from "~/api/schema/resp";

export const loader = async ({ context, request }: LoaderArgs) => {
  const response = await context.api.tag.getTagsByList(request);
  return json<TagListRespSchema>(response);
};

export type Loader = typeof loader;

export const getPath = (params?: Record<string, any>) => {
  const _base = "/loader/tags.json";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};
