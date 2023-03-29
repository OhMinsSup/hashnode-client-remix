import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListDelayedApi } from "~/api/tags/tags";
import { getTopPostsDelayedApi } from "~/api/posts/posts";
import { getWidgetBookmarksDelayedApi } from "~/api/widget/widget";
import { getSessionApi } from "~/api/user/user";

// components
import { Outlet } from "@remix-run/react";
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

export const meta: V2_MetaFunction = () => {
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

export type HomeLoaderData = typeof loader;

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
