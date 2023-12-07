import { WritePage } from "~/components/write/future/WritePage";
import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
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
  const post = await context.api.user.getOwnerPostDetailByUser(
    request,
    params.postId
  );
  return json({
    post,
  });
};

export type RoutesData = typeof loader;

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
