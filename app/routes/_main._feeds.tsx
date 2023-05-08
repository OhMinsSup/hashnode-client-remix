import React from "react";

// remix
import { defer } from "@remix-run/cloudflare";

// api
import { getAritcleCirclesApi } from "~/api/widget/aritcle-circles.server";

// provider
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import TabRoutesPosts from "~/components/home/TabRoutesPosts";
import ScrollAreaTrendingUsers from "~/components/home/ScrollAreaTrendingUsers";

// styles
import homeListStyle from "~/styles/routes/home-list.css";

import type { LoaderArgs, LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeListStyle }];
};

export const loader = (args: LoaderArgs) => {
  const getAricleCirclePromise = getAritcleCirclesApi(undefined, {
    loaderArgs: args,
  });
  return defer({
    getAricleCircle: getAricleCirclePromise,
  });
};

export type MainFeedsLoader = ReturnType<typeof loader>;

export default function MainFeedsPage() {
  return (
    <div className="main__list-container">
      <div className="main__list-container__trending-users">
        <ScrollAreaTrendingUsers />
      </div>
      <div className="main__list-container__tabs">
        <TabRoutesPosts>
          <Outlet />
        </TabRoutesPosts>
      </div>
    </div>
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
