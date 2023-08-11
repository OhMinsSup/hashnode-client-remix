import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// utils
import { parseUrlParams } from "~/utils/util";

// components
// import PostsList from "~/components/shared/PostsList.unstable";
import { HashnodeList } from "~/components/shared/future/HashnodeList";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
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
  } as const;

  const { json: data } = await context.api.item.getItems(request, args);

  return json({
    posts: data?.result,
  });
};

export type MainFeedsIndexLoader = typeof loader;

export default function Routes() {
  return <HashnodeList />;
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
