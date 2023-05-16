import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// api
import { getPostListApi } from "~/api/posts/posts.server";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/shared/PostsList.unstable";

import type { LoaderArgs } from "@remix-run/cloudflare";

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

  const posts = await getPostListApi(
    {
      cursor,
      limit,
      type: "recent",
    },
    {
      loaderArgs: args,
    }
  );

  return json({
    posts: posts.json?.result,
  });
};

export type MainFeedsIndexLoader = typeof loader;

export default function MainFeedsIndexPage() {
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
