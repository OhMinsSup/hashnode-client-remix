import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// api
import { getPostListApi } from "~/api/posts/posts.server";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/shared/PostsList.unstable";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const tag = args.params.tag?.toString();
  if (!tag) {
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

  const posts = await getPostListApi(
    {
      cursor,
      limit,
      type: "featured",
      tag,
    },
    {
      loaderArgs: args,
    }
  );

  return json({
    posts: posts.json?.result,
  });
};

export type nTagHotLoader = typeof loader;

export default function NTagHotPage() {
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
