import { json } from "@remix-run/cloudflare";

// components
import LikedPostsList from "~/components/bookmarks/LikedPostsList.unstable";

// utils
import { parseUrlParams } from "~/utils/util";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const args = {
    cursor,
    limit,
  } as const;

  const { json: data } = await context.api.item.getLikeItems(request, args);

  return json({
    posts: data?.result,
  });
};

export type MainBookmarksLoader = typeof loader;

export default function MainBookmarksIndexPage() {
  return <LikedPostsList />;
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
