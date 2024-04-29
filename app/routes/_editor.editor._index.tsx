import "~/styles/editor/index.css";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React from "react";

const Editor = React.lazy(
  () => import("~/components/editor/future/BlockEditor/BlockEditor")
);

export default function Routes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Editor />
    </React.Suspense>
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
