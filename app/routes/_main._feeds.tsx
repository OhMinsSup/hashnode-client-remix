import { HashnodeContainer } from "~/components/shared/future/HashnodeContainer";
import { HashnodeTabs } from "~/components/shared/future/HashnodeTabs";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import { feedsLayoutLoader } from "~/server/routes/feeds-layout/feeds-layout-loader.server";

export const loader = feedsLayoutLoader;

export default function Routes() {
  return (
    <HashnodeContainer>
      <HashnodeTabs>
        <Outlet />
      </HashnodeTabs>
    </HashnodeContainer>
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
