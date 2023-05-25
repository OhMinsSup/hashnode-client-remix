import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { STATUS_CODE } from "~/constants/constant";

// components
import PostsList from "~/components/shared/PostsList.unstable";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  const tagName = params.tag?.toString();
  if (!tagName) {
    throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  }
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const args = {
    cursor,
    limit,
    type: "recent",
    tag: tagName,
  } as const;

  const { json: data } = await context.api.item.getItems(request, args);
  return json({
    posts: data?.result,
  });
};

export type nTagIndexLoader = typeof loader;

export default function NTagIndexPage() {
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
