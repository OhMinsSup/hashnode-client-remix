import React from "react";
import { json } from "@remix-run/cloudflare";

// api
import { getPostsApi } from "~/api/posts/posts";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/home/PostsList";

import type {
  LoaderArgs,
  V2_MetaFunction,
  HeadersFunction,
} from "@remix-run/cloudflare";

const Seo = {
  title: "Recent posts on Hashnode",
  description: "Recent developer posts on Hashnode",
};

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

  const posts = await getPostsApi(
    {
      cursor,
      limit,
      type: "recent",
    },
    args
  );

  return json({
    posts: posts.result?.result,
  });
};

export type DataLoader = typeof loader;

export const header: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=120",
  };
};

export const meta: V2_MetaFunction<DataLoader> = () => {
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
