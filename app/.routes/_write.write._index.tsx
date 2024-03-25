// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { list } = await context.api.post.getDraftPostList(request);
  const item = list.at(0);
  if (item) {
    return redirect(safeRedirect(PAGE_ENDPOINTS.WRITE.ID(item.id)));
  }
  return await context.api.draft.createDraft(request, true);
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
