import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React from "react";
import { writeByIdLoader } from "~/.server/routes/write/write.$id.loader";
import { Spinner } from "~/components/editor/future/components/Spinner";
import { WriteEditor } from "~/components/write/future/WriteEditor";
import { WritePageHeader } from "~/components/write/future/WritePageHeader";

const Editor = React.lazy(
  () => import("~/components/editor/future/BlockEditor/BlockEditor")
);

export const loader = writeByIdLoader;

export default function Routes() {
  return (
    <>
      <WritePageHeader />
      <WriteEditor header={<>Editor Header</>}>
        <React.Suspense fallback={<Spinner />}>
          <Editor />
        </React.Suspense>
      </WriteEditor>
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
