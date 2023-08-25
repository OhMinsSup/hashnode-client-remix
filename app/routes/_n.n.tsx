import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import { defer } from "@remix-run/cloudflare";

import Header from "~/components/shared/Header";
import AppLeftSidebar from "~/components/shared/AppLeftSidebar";
import AppRightSidebar from "~/components/n/AppRightSidebar";

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

export const loader = async ({ request, context }: LoaderArgs) => {
  return defer({
    trendingTag: context.api.tag.getTagList(request, { type: "popular" }),
    trendingTagsWeek: context.api.tag.getTagList(request, {
      type: "popular",
      category: "week",
    }),
    trendingTagsAll: context.api.tag.getTagList(request, {
      type: "trending",
      category: "all",
    }),
  });
};

export type nLoader = typeof loader;

export default function Routes() {
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
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
