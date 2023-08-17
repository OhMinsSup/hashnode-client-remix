import { json } from "@remix-run/cloudflare";

import type { LoaderArgs } from "@remix-run/cloudflare";
import type { GetTopPostsRespSchema } from "~/api/schema/resp";

export const loader = async ({ context, request }: LoaderArgs) => {
  const response = await context.api.item.getItemsByTopList(request);
  return json<GetTopPostsRespSchema>(response);
};

export type Loader = typeof loader;

export const getPath = (duration: number | string) =>
  `/loader/get-top-posts.json?duration=${duration}`;
