import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getTopPostsApi } from "~/api/posts/posts";

// components
import { Outlet } from "@remix-run/react";
import Header from "~/components/shared/Header";

// styles
import homeStyles from "~/styles/routes/home.css";

// types
import type {
  LoaderArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";
import Sidebar from "~/components/home/Sidebar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hashnode - Blogging community for developers, and people in tech",
  description:
    "Start a blog for free instantly and share your ideas with people in tech, developers, and engineers. Hashnode is a free blogging platform.",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader = (args: LoaderArgs) => {
  const trendingTagPromise = getTagListApi(
    {
      type: "popular",
    },
    args
  );

  const topPostsPromise = getTopPostsApi(
    {
      duration: 7,
    },
    args
  );

  return defer({
    trendingTag: trendingTagPromise,
    topPosts: topPostsPromise,
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
