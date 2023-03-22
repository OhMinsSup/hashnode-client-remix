import React from "react";
import { json } from "@remix-run/cloudflare";

// api
import { getPostsListApi } from "~/api/posts/posts";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/home/PostsList";

import type { LoaderArgs, MetaFunction } from "@remix-run/cloudflare";

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
    type: "featured",
  });

  return json({
    posts: posts.result?.result,
  });
};

export const meta: MetaFunction = () => ({
  title: "Featured posts on Hashnode",
  description:
    "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.",
});

export default function IndexPage() {
  return <PostsList />;
}
