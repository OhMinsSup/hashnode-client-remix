import React from "react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getPostsListApi, getTopPostsApi } from "~/api/posts/posts";

// components
import { RootTemplate } from "~/components/posts";
import { parseUrlParams } from "~/utils/util";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const params = parseUrlParams(request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const trendingTag = await getTagListApi({
    type: "popular",
    limit: 6,
  });

  const posts = await getPostsListApi({
    cursor,
    limit,
  });

  const topPosts = await getTopPostsApi({
    duration: 7,
  });

  return json({
    trendingTag: trendingTag.result?.result,
    posts: posts.result?.result,
    topPosts,
  });
};

export default function App() {
  return (
    <RootTemplate>
      <Outlet />
    </RootTemplate>
  );
}
