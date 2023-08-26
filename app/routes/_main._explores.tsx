import React from "react";
import { Outlet } from "@remix-run/react";
import { CategoryBoxWithHashnodeList } from "~/components/shared/future/CategoryBoxWithHashnodeList";

// types
import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { ExploreTabs } from "~/components/explore/future/ExploreTabs";

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

export default function Routes() {
  return (
    <CategoryBoxWithHashnodeList
      title="Explore Tech Blogs &amp; Tags"
      description={
        <>
          Explore the most popular tech blogs from the Hashnode community.{" "}
          <br />A constantly updating list of popular tags and the best minds in
          tech.
        </>
      }
      isOutSideContent
    >
      <ExploreTabs>
        <Outlet />
      </ExploreTabs>
    </CategoryBoxWithHashnodeList>
  );
}
