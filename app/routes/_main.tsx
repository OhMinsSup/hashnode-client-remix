import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tagList";
import { getTopPostsApi } from "~/api/posts/top-posts";
import { getWidgetBookmarksApi } from "~/api/widget/widget-bookmarks.server";
import { getSessionApi } from "~/libs/server/session.server";
import { noopPromiseResponse } from "~/libs/server/response.server";

// components
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  useMatches,
} from "@remix-run/react";
import Header from "~/components/shared/Header";
import Sidebar from "~/components/home/Sidebar";

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
    topPosts: getTopPostsApi(
      {
        duration: 7,
      },
      {
        loaderArgs: args,
      }
    ),
    bookmarks: bookmarksPromise,
  });
};

export type HomeLoader = typeof loader;

export default function Main() {
  const matchs = useMatches();
  console.log(matchs);
  return (
    <div className="container__base">
      <Header />
      <main>
        <Sidebar.Left />
        <Outlet />
        <Sidebar.Right />
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
