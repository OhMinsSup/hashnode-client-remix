import { json } from "@remix-run/cloudflare";

import { HashnodeList } from "~/components/shared/future/HashnodeList";

// utils
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderArgs) => {
  const response = await context.api.post.getPostsByLikeList(request);
  return json(response);
};

export type Loader = typeof loader;

export default function Routes() {
  return <HashnodeList />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
