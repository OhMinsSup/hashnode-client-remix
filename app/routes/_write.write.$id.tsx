import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  writeByIdLoader,
  type RoutesLoaderData,
} from "~/.server/routes/write/write.$id.loader";

export const loader = writeByIdLoader;

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();
  console.log(data);
  return <>Post Write: {JSON.stringify(data)}</>;
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
