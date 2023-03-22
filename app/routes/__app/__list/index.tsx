import React from "react";
import { json } from "@remix-run/cloudflare";

// api
import { getPostsListApi } from "~/api/posts/posts";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/home/PostsList";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const posts = await getPostsListApi({
    cursor,
    limit,
    type: "recent",
  });

  return json({
    posts: posts.result?.result,
  });
};

export default function IndexPage() {
  return <PostsList />;
}
