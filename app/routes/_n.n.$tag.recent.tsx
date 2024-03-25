import {
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { HashnodeList } from "~/components/shared/future/HashnodeList";
import type { RoutesLoaderData } from "~/.server/routes/n-layout/n-layout.loader";
import { nRecentLoader } from "~/.server/routes/n-recent/n-recent.loader";

export const loader = nRecentLoader;

export default function Routes() {
  const data = useRouteLoaderData<RoutesLoaderData>("routes/_n.n.$tag");
  return (
    <HashnodeList
      searchParams={
        data?.result ? { tag: data.result.name, limit: "10" } : undefined
      }
    />
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
