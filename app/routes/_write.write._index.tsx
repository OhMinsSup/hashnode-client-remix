// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import { type LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  await context.api.post.createWithDrfatList(request);
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
