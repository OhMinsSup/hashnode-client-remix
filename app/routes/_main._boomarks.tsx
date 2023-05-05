import React from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// api
import { getSessionApi } from "~/libs/server/session.server";

// types
import type {
  LoaderArgs,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";

// styles
import homeListStyle from "~/styles/routes/home-list.css";
import homeBookmarkStyle from "~/styles/routes/home-bookmark.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: homeListStyle },
    { rel: "stylesheet", href: homeBookmarkStyle },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const { type, header: headers } = await getSessionApi(args);
  if (type !== "session") {
    throw redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
      headers,
      status: 302,
    });
  }
  return json({ ok: true });
};

export type BookmarksLoader = typeof loader;

export const meta: V2_MetaFunction<BookmarksLoader> = ({ data, matches }) => {
  const Seo = {
    title: "Bookmarks - Hashnode",
    description: "Bookmarks - Hashnode",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title: Seo.title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
  ];
};

export default function Bookmarks() {
  return (
    <div className="relative col-span-7 min-w-0 pb-5 pt-5">
      <div className="content-info-box">
        <h1>Bookmarks</h1>
        <p>All articles you have bookmarked on Hashnode</p>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <Outlet />
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
