import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React from "react";
import { writeByIdLoader } from "~/.server/routes/write/write.$id.loader";
import { WriteEditor } from "~/components/write/future/WriteEditor";
import { WriteEditorHeader } from "~/components/write/future/WriteEditorHeader";
import { WritePageHeader } from "~/components/write/future/WritePageHeader";

const Editor = React.lazy(
  () => import("~/components/editor/future/BlockEditor/BlockEditor")
);

export const loader = writeByIdLoader;

export default function Routes() {
  return (
    <>
      <WritePageHeader />
      <WriteEditor header={<WriteEditorHeader />}>
        <React.Suspense fallback={<></>}>
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
