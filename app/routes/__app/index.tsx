import React from "react";
import {
  type LoaderFunction,
  json,
  type LinksFunction,
} from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getPostsListApi, getTopPostsApi } from "~/api/posts/posts";

// components
import TabPostList from "~/components/ui/main/TabPostList";

// utils
import { parseUrlParams } from "~/utils/util";

// provider
import { ListProvider } from "~/context/useListContext";

// styles
import homeStylesheetUrl from "~/styles/home.css";

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

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStylesheetUrl }];
};

export default function IndexPage() {
  return (
    <ListProvider>
      <div className="home-container">
        <div className="tab-container">
          <TabPostList />
        </div>
      </div>
    </ListProvider>
  );
}
