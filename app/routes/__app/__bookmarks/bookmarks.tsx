import React from "react";
import { json } from "@remix-run/cloudflare";

// constants

// utils
import { parseUrlParams } from "~/utils/util";

// api
import { getLikePostsApi } from "~/api/posts/posts";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

// styles
import LikedPostsList from "~/components/home/LikedPostsList";

export const loader = async (args: LoaderArgs) => {
  const params = parseUrlParams(args.request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const posts = await getLikePostsApi(
    {
      cursor,
      limit,
    },
    args
  );

  return json({
    posts: posts.result?.result,
  });
};

export type DataLoader = typeof loader;

export default function Bookmarks() {
  return <LikedPostsList />;
}
