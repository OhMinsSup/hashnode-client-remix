import React from "react";
import { Outlet } from "@remix-run/react";
import TabRoutesExplore from "~/components/explore/TabRoutesExplore";

// types
import type { V2_MetaFunction, LinksFunction } from "@remix-run/cloudflare";

// styles
import homeExploreStyle from "~/styles/routes/home-explore.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeExploreStyle,
    },
  ];
};

export const meta: V2_MetaFunction = ({ matches }) => {
  const title = "Explore Popular Tech Blogs and Topics - Hashnode";
  const description =
    "Explore the most popular tech blogs from the Hashnode community. A constantly updating list of the best minds in tech.";
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
      title,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
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
