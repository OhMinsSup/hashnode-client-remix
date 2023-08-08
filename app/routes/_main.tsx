import { defer } from "@remix-run/cloudflare";

// components
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";

// styles
import homeStyles from "~/styles/routes/home.css";

// types
import type { LoaderArgs, LinksFunction } from "@remix-run/cloudflare";
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  return defer({
    trendingTag: context.api.tag.getTagList(request, { type: "popular" }),
    bookmarks: context.api.widget.getWidgetBookmarks(request),
  });
};

export type MainLoader = typeof loader;

export default function Routes() {
  return (
    <MainLayout footer={<MainFooter />}>
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
