import { WritePage } from "~/components/write/future/WritePage";
import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const { postId } = params;
  if (!postId) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
  const post = await context.api.post.getOwnerPostDetail(postId, request);
  return json({
    post,
  });
};

export type RoutesData = typeof loader;

export const action = async ({
  params,
  request,
  context,
}: ActionFunctionArgs) => {
  return await context.api.post.updateItem(request, params.postId);
};

export type RoutesActionData = typeof action;

export default function Routes() {
  const data = useLoaderData<RoutesData>();
  return <WritePage initialValues={data.post} />;
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
