// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { WriteContent } from "~/components/write/future/WriteContent";
import { WriteHeader } from "~/components/write/future/WriteHeader";
import { WriteLeftHeader } from "~/components/write/future/WriteLeftHeader";
import { WriteRightHeader } from "~/components/write/future/WriteRightHeader";

export default function Routes() {
  return (
    <>
      <WriteHeader left={<WriteLeftHeader />} right={<WriteRightHeader />} />
      <WriteContent />
    </>
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
