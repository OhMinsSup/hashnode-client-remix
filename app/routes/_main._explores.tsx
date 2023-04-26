import React from "react";
import { Outlet } from "@remix-run/react";

// types
import type {
  V2_MetaFunction,
  HeadersFunction,
  LinksFunction,
} from "@remix-run/cloudflare";

// styles
import homeExploreStyle from "~/styles/routes/home-explore.css";
import TabRoutesExplore from "~/components/explore/TabRoutesExplore";

const Seo = {
  title: "Explore Popular Tech Blogs and Topics - Hashnode",
  description:
    "Explore the most popular tech blogs from the Hashnode community. A constantly updating list of the best minds in tech.",
  image: "/images/seo_image.png",
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeExploreStyle,
    },
  ];
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

export default function Explore() {
  return (
    <div className="relative col-span-7 min-w-0 pb-5 pt-5">
      <div className="content-info-box">
        <h1>Explore Tech Blogs &amp; Tags</h1>
        <p>
          Everything that's… Hashnode. Explore the most popular tech blogs from
          the Hashnode community. A constantly updating list of popular tags and
          the best minds in tech.
        </p>
      </div>
      <TabRoutesExplore>
        <Outlet />
      </TabRoutesExplore>
    </div>
  );
}
