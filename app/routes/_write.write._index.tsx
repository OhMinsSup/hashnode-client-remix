// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { list } = await context.api.post.getPostsByDraftList(request);
  const $firstPost = list.at(0);
  if ($firstPost) return redirect(PAGE_ENDPOINTS.WRITE.ID($firstPost.id));
  const data = await context.api.post.createDraft(request);
  if (!data || (data && "errors" in data) || (data && !data.dataId)) {
    return redirect(PAGE_ENDPOINTS.ROOT);
  }
  return redirect(PAGE_ENDPOINTS.WRITE.ID(data.dataId));
};

export default function Routes() {
  // TODO: Loading Screen
  return <></>;
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
