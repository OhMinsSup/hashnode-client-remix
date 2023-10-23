import { WritePage } from "~/components/write/future/WritePage";
import { redirect, type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const id = params.postId;
  if (!id) return redirect(PAGE_ENDPOINTS.ROOT);
  const item = await context.api.post.getPost(id, request);
  if (!item) return redirect(PAGE_ENDPOINTS.ROOT);
  return json(item);
};

export type RoutesData = typeof loader;

export default function Routes() {
  const data = useLoaderData<RoutesData>();
  return <WritePage initialValues={data} />;
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
