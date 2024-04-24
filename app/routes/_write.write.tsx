import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { writeLayoutMeta } from "~/services/seo/write/write-layout.meta";
import { writeLayoutLoader } from "~/.server/routes/write/write-layout.loader";

export const meta = writeLayoutMeta;

export const loader = writeLayoutLoader;

export default function Routes() {
  return <Outlet />;
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
