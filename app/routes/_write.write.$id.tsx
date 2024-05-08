import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import { writeByIdLoader } from "~/.server/routes/write/write.$id.loader";
import { WriteEditor } from "~/components/write/future/WriteEditor";
import { WriteEditorHeader } from "~/components/write/future/WriteEditorHeader";
import { WritePageHeader } from "~/components/write/future/WritePageHeader";
import { WriteFormProvider } from "~/components/write/context/useWriteFormContext";

const Editor = React.lazy(
  () => import("~/components/editor/future/BlockEditor/BlockEditor")
);

export const loader = writeByIdLoader;

export default function Routes() {
  const data = useLoaderData<typeof loader>();

  const initialValues = data?.result as SerializeSchema.SerializePost<false>;

  return (
    <WriteFormProvider initialValues={initialValues}>
      <WritePageHeader />
      <WriteEditor header={<WriteEditorHeader />}>
        <React.Suspense fallback={<></>}>
          <Editor />
        </React.Suspense>
      </WriteEditor>
    </WriteFormProvider>
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
