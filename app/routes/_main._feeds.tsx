// remix
import { defer } from "@remix-run/cloudflare";

// components
import { HashnodeContainer } from "~/components/shared/future/HashnodeContainer";
import { HashnodeTabs } from "~/components/shared/future/HashnodeTabs";

// provider
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = ({ context, request }: LoaderArgs) => {
  return defer({
    getAricleCircle: context.api.widget.getAritcleCircles(request),
  });
};

export type MainFeedsLoader = ReturnType<typeof loader>;

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
