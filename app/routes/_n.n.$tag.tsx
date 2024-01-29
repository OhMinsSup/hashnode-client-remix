import { defer, redirect } from "@remix-run/cloudflare";
import {
  isRouteErrorResponse,
  Outlet,
  useRouteError,
  useLoaderData,
} from "@remix-run/react";

// components
import { TagBoxWithHashnodeList } from "~/components/n/future/TagBoxWithHashnodeList";
import { HashnodeTagTabs } from "~/components/n/future/HashnodeTagTabs";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { safeRedirect } from "remix-utils/safe-redirect";

// types
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";

export const loader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  const tag = params.tag?.toString();
  if (!tag) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }

  const tagInfo = await context.api.tag.getTagInfo(tag, request);

  return defer({
    tagInfo,
  });
};

export const action = ({ context, request, params }: ActionFunctionArgs) => {
  const tag = params.tag?.toString();
  if (!tag) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
  return context.api.tag.followByTag(tag, request);
};

export type RoutesLoader = typeof loader;

export type RoutesActionData = typeof action;

export default function Routes() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <TagBoxWithHashnodeList>
      <HashnodeTagTabs slug={data?.tagInfo?.name}>
        <Outlet />
      </HashnodeTagTabs>
    </TagBoxWithHashnodeList>
  );
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
