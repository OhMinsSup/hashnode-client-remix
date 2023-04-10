import React from "react";
import { json } from "@remix-run/cloudflare";

// api
import { getPostsApi } from "~/api/posts/posts";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/home/PostsList.unstable";

import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";

const Seo = {
  title: "Featured posts on Hashnode",
  description:
    "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.",
};

export const loader = async (args: LoaderArgs) => {
  const params = parseUrlParams(args.request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const posts = await getPostsApi(
    {
      cursor,
      limit,
      type: "featured",
    },
    args
  );

  return json(
    {
      posts: posts.result?.result,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=120",
      },
    }
  );
};

export const meta: V2_MetaFunction<typeof loader> = () => {
  return [
    {
      title: Seo.title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
  ];
};

export default function IndexPage() {
  return <PostsList />;
}
