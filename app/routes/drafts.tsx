import React from "react";
import { RootTemplate } from "~/components/posts";
import { getTendingTags } from "~/libs/mock/tags";
import { getPersonalizedPosts } from "~/libs/mock/posts";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request }) => {
  const { tags: trendingTags } = await getTendingTags();
  const { personalizedPosts } = await getPersonalizedPosts();
  return json({
    trendingTags,
    personalizedPosts,
  });
};

const StoriesDrafts = () => {
  return <RootTemplate>StoriesDrafts</RootTemplate>;
};

export default StoriesDrafts;
