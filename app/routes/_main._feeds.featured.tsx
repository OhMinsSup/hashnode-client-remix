import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

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

  return json({
    posts: posts.result?.result,
  });
};

export type MainFeedsFeaturedLoader = typeof loader;

export const meta: V2_MetaFunction<MainFeedsFeaturedLoader> = () => {
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

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
