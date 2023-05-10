import React from "react";

// provider
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import PostsList from "~/components/home/PostsList.unstable";

import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";
import { getUserPostListApi } from "~/api/user/user-posts.server";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const username = args.params.username?.toString();
  if (!username) {
    throw new Response("Not Found", { status: 404 });
  }

  const params = parseUrlParams(args.request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const posts = await getUserPostListApi(
    username,
    {
      cursor,
      limit,
    },
    {
      loaderArgs: args,
    }
  );

  return json({
    posts: posts.json?.result,
  });
};

export type MainUserPostsIndexLoader = typeof loader;

export default function MainUserPostsPage() {
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
