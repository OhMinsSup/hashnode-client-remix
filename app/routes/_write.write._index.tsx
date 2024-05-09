// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
export { loader } from "~/.server/routes/write/write.loader";

export default function Routes() {
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
