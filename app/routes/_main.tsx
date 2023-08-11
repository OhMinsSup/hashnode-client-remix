import { defer } from "@remix-run/cloudflare";

// components
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  return defer({
    trendingTag: context.api.tag.getTagList(request, {
      type: "popular",
      limit: 4,
    }),
  });
};

export type Loader = typeof loader;

export default function Routes() {
  return (
    <MainLayout footer={<MainFooter />} sidebar={<HashnodeAside />}>
      <Outlet />
    </MainLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
