import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tagList";
import { getWidgetBookmarksApi } from "~/api/widget/widget-bookmarks.server";
import { getSessionApi } from "~/libs/server/session.server";
import { noopPromiseResponse } from "~/libs/server/response.server";

// components
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import Header from "~/components/shared/Header";
import AppLeftSidebar from "~/components/shared/AppLeftSidebar";
import AppRightSidebar from "~/components/shared/AppRightSidebar";

// styles
import homeStyles from "~/styles/routes/home.css";

// types
import type { LoaderArgs, LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = async (args: LoaderArgs) => {
  const data = await getSessionApi(args);
  let bookmarksPromise: ReturnType<typeof getWidgetBookmarksApi> | null = null;
  if (data.type === "session") {
    bookmarksPromise = getWidgetBookmarksApi(undefined, {
      loaderArgs: args,
    });
  } else {
    bookmarksPromise = noopPromiseResponse([]) as ReturnType<
      typeof getWidgetBookmarksApi
    >;
  }
  return defer({
    trendingTag: getTagListApi(
      {
        type: "popular",
      },
      {
        loaderArgs: args,
      }
    ),
    bookmarks: bookmarksPromise,
  });
};

export type MainLoader = typeof loader;

export default function Main() {
  return (
    <div className="container__base">
      <Header />
      <main>
        <AppLeftSidebar />
        <Outlet />
        <AppRightSidebar />
      </main>
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
