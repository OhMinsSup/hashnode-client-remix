import { json } from "@remix-run/cloudflare";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  const response = await context.api.post.getPostsByTop(request);
  return json(response);
};

export type Loader = typeof loader;

export const getPath = (duration: number | string) =>
  `/loader/get-top-posts.json?duration=${duration}`;
