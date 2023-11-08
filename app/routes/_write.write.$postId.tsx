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
  const response = await context.api.user.getOwnerPostDetailByUser(
    request,
    params.postId
  );
  if (response instanceof Response) throw response;
  return json(response);
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
