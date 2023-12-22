import { json } from "@remix-run/cloudflare";

// types
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.post.getLikePosts(request);
  return json(response);
};

export type Loader = typeof loader;

export const getPath = (params?: Record<string, any>) => {
  const _base = "/loader/get-like-posts.json";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};
