import React from "react";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import { defer, redirect } from "@remix-run/cloudflare";

import Header from "~/components/shared/Header";
import Sidebar from "~/components/home/Sidebar";

// api
import {
  getTagListDelayedApi,
  getTagTrendingListDelayedApi,
} from "~/api/tags/tags";

// types
import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";

// styles
import homeStyle from "~/styles/routes/home.css";
import nStyle from "~/styles/routes/n.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeStyle,
    },
    {
      rel: "stylesheet",
      href: nStyle,
    },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const tag = args.params.tag?.toString();
  if (!tag) {
    throw redirect("/", 302);
  }

  const trendingTagPromise = getTagListDelayedApi(
    {
      type: "popular",
    },
    args
  );

  const trendingTagsWeekPromise = getTagTrendingListDelayedApi(
    {
      category: "week",
    },
    args
  );

  const trendingTagsAllPromise = getTagTrendingListDelayedApi(
    {
      category: "all",
    },
    args
  );

  return defer({
    trendingTag: trendingTagPromise,
    trendingTagsWeek: trendingTagsWeekPromise,
    trendingTagsAll: trendingTagsAllPromise,
  });
};

export type NRootLoader = typeof loader;

export default function N() {
  return (
    <div className="container__base">
      <Header />
      <main>
        <Sidebar.Left />
        <Outlet />
        <Sidebar.TagRight />
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
