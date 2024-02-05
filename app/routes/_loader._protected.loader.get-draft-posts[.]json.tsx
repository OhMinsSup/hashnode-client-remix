import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  return await context.api.post.getDraftPostList(request);
};

export type RoutesLoader = typeof loader;

export const getPath = (query?: FetchQuerySchema.Pagination) => {
  const search = new URLSearchParams();
  if (query?.cursor) search.set("cursor", query.cursor.toString());
  if (query?.limit) search.set("limit", query.limit.toString());
  let path = "/loader/get-draft-posts.json";
  if (search.toString()) path += `?${search.toString()}`;
  return path;
};
