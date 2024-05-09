import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import { type RoutesLoaderData } from "~/.server/routes/write/write.$id.loader";
import { WriteEditor } from "~/components/write/future/WriteEditor";
import { WriteEditorHeader } from "~/components/write/future/WriteEditorHeader";
import { WritePageHeader } from "~/components/write/future/WritePageHeader";
import { WriteFormProvider } from "~/components/write/context/useWriteFormContext";
export { loader } from "~/.server/routes/write/write.$id.loader";

const Editor = React.lazy(
  () => import("~/components/editor/future/BlockEditor/BlockEditor")
);

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

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
