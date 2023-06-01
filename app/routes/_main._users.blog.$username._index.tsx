// provider
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import PostsList from "~/components/shared/PostsList.unstable";

import { json } from "@remix-run/cloudflare";
import { parseUrlParams } from "~/utils/util";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, params, context }: LoaderArgs) => {
  const username = params.username?.toString();
  if (!username) {
    throw new Response("Not Found", { status: 404 });
  }
  const searchParams = parseUrlParams(request.url);
  let cursor = undefined;
  if (searchParams.cursor) {
    cursor = parseInt(searchParams.cursor);
  }
  let limit = undefined;
  if (searchParams.limit) {
    limit = parseInt(searchParams.limit);
  }
  const args = {
    cursor,
    limit,
  };
  const { json: data } = await context.api.item.getUserItems(
    request,
    username,
    args
  );
  return json({
    posts: data?.result,
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
