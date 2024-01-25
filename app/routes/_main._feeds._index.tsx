import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import { HashnodeList } from "~/components/shared/future/HashnodeList";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.post.getPostList(request, {
    limit: 10,
  });
  return json(response, {
    headers: { "Cache-Control": "public, max-age=120" },
  });
};

export type RoutesLoader = typeof loader;

export default function Routes() {
  // const data = useRouteLoaderData<MainRoutesLoader>("routes/_main._feeds");
  // console.log(data);
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
