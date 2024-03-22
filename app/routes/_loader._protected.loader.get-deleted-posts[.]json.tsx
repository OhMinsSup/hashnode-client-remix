import { json } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.post.getPostsByDeleteList(request);
  return json(response);
};

/**
 * @deprecated
 */
export type Loader = typeof loader;

/**
 * @deprecated
 */
export const getPath = (query?: FetchQuerySchema.Pagination) => {
  const search = new URLSearchParams();
  if (query?.cursor) search.set("cursor", query.cursor.toString());
  if (query?.limit) search.set("limit", query.limit.toString());
  let path = "/loader/get-deleted-posts.json";
  if (search.toString()) path += `?${search.toString()}`;
  return path;
};
