import { json } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.widget.getWidgetTopPostList(request);
  return json(response);
};

export type Loader = typeof loader;

export const getPath = (duration: number | string) =>
  `/loader/get-top-posts.json?duration=${duration}`;
