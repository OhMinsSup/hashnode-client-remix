import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  writeByIdLoader,
  type RoutesLoaderData,
} from "~/.server/routes/write/write.$id.loader";
import { WriteEditor } from "~/components/write/future/WriteEditor";
import { WritePageHeader } from "~/components/write/future/WritePageHeader";

export const loader = writeByIdLoader;

export default function Routes() {
  const _ = useLoaderData<RoutesLoaderData>();
  return (
    <>
      <WritePageHeader />
      <WriteEditor />
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
