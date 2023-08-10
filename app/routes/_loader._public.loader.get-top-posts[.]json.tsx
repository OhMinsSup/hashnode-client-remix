import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { GetTopPostsRespSchema } from "~/api/schema/resp";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let duration = 7;
  if (params.duration && isNaN(parseInt(params.duration)) === false) {
    duration = parseInt(params.duration);
  }

  const args = {
    duration,
  } as const;

  const { json: resp } = await context.api.widget.getTopPosts(request, args);

  const data =
    resp?.result ??
    ({
      posts: [],
    } as GetTopPostsRespSchema);

  return json(data);
};

export type Loader = typeof loader;

export const getPath = (duration: number | string) =>
  `/loader/get-top-posts.json?duration=${duration}`;
