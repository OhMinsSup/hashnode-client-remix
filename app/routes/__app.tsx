import React from "react";
import { defer } from "@remix-run/cloudflare";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getTopPostsApi } from "~/api/posts/posts";

// components
import { Outlet } from "@remix-run/react";
import Header from "~/components/shared/Header";
import Sidebar from "~/components/home/Sidebar";

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

  // TODO: Server Side Widget API Call Bookmarks
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
