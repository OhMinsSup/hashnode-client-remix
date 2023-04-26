import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListDelayedApi } from "~/api/tags/tags";
import { getTopPostsDelayedApi } from "~/api/posts/posts";
import { getWidgetBookmarksDelayedApi } from "~/api/widget/widget";
import { getSessionApi } from "~/api/user/user";

// components
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import Header from "~/components/shared/Header";
import Sidebar from "~/components/home/Sidebar";

// utils
import { noopPromiseResponse } from "~/utils/util";

// styles
import homeStyles from "~/styles/routes/home.css";

// types
import type {
  LoaderArgs,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";

const Seo = {
  title: "Hashnode - Blogging community for developers, and people in tech",
  description:
    "Start a blog for free instantly and share your ideas with people in tech, developers, and engineers. Hashnode is a free blogging platform.",
  image: "/images/seo_image.png",
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = async (args: LoaderArgs) => {
  const trendingTagPromise = getTagListDelayedApi(
    {
      type: "popular",
    },
    args
  );

  const topPostsPromise = getTopPostsDelayedApi(
    {
      duration: 7,
    },
    args
  );

  const data = await getSessionApi(args);
  let bookmarksPromise: ReturnType<typeof getWidgetBookmarksDelayedApi> | null =
    null;
  if (data && data.type === "session") {
    bookmarksPromise = getWidgetBookmarksDelayedApi(undefined, args);
  } else {
    bookmarksPromise = noopPromiseResponse([]);
  }

  return defer({
    trendingTag: trendingTagPromise,
    topPosts: topPostsPromise,
    bookmarks: bookmarksPromise,
  });
};

export type HomeLoader = typeof loader;

export const meta: V2_MetaFunction<HomeLoader> = () => {
  return [
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
      name: "og:image",
      content: Seo.image,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
    {
      name: "twitter:image",
      content: Seo.image,
    },
  ];
};

export default function App() {
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
