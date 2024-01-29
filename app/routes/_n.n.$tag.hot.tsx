import { json, redirect } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import { HashnodeList } from "~/components/shared/future/HashnodeList";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  const tag = params.tag?.toString();
  if (!tag) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
  const response = await context.api.post.getPostList(request, {
    type: "featured",
    tag,
  });
  return json(response);
};

export type RoutesLoader = typeof loader;

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
