// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { WriteContent } from "~/components/write/future/WriteContent";
import { WriteHead } from "~/components/write/future/WriteHead";
import { WriteHeader } from "~/components/write/future/WriteHeader";
import { WriteLeftHeader } from "~/components/write/future/WriteLeftHeader";
import { WriteRightHeader } from "~/components/write/future/WriteRightHeader";
import { WritePublishDrawer } from "~/components/write/future/WritePublishDrawer";
import { WriteFormProvider } from "~/components/write/context/form";

export default function Routes() {
  return (
    <WriteFormProvider>
      <WriteHeader left={<WriteLeftHeader />} right={<WriteRightHeader />} />
      <WriteContent header={<WriteHead />} drawer={<WritePublishDrawer />} />
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
