import React from "react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getTopPostsApi } from "~/api/posts/posts";

// components
import { RootTemplate } from "~/components/posts";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const trendingTag = await getTagListApi({
    type: "popular",
    limit: 6,
  });

  const topPosts = await getTopPostsApi({
    duration: 7,
  });

  return json({
    trendingTag: trendingTag.result?.result,
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
