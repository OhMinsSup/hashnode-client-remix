import {
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { HashnodeList } from "~/components/shared/future/HashnodeList";
import { nHotLoader } from "~/server/routes/n-hot/n-hot-loader.server";
import type { RoutesLoaderData } from "~/server/routes/n-layout/n-layout-loader.server";

export const loader = nHotLoader;

export default function Routes() {
  const data = useRouteLoaderData<RoutesLoaderData>("routes/_n.n.$tag");
  return (
    <HashnodeList
      searchParams={
        data?.result
          ? { tag: data.result.name, type: "featured", limit: "10" }
          : undefined
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
