import { json } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.file.getFiles(request);
  return json(response);
};

export type Loader = typeof loader;

export const getPath = (query?: FetchQuerySchema.Pagination) => {
  const search = new URLSearchParams();
  if (query?.cursor) search.set("cursor", query.cursor.toString());
  if (query?.limit) search.set("limit", query.limit.toString());
  let path = "/loader/get-uploaded-files.json";
  if (search.toString()) path += `?${search.toString()}`;
  return path;
};
