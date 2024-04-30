import type { MetaFunction } from "@remix-run/cloudflare";
import type { RoutesLoaderData } from "~/.server/routes/root/root.loader";
import { ASSET_URL } from "~/constants/constant";

export const rootMeta: MetaFunction<RoutesLoaderData> = ({
  location,
  data,
}) => {
  const url = new URL(location.pathname, data?.origin);
  const Seo = {
    title: "Hashnode",
    description:
      "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.",
    image: ASSET_URL.SEO_IMAGE,
  };
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
      name: "og:type",
      content: "website",
    },
    {
      name: "og:site_name",
      content: "Hashnode",
    },
    {
      name: "og:url",
      content: url.href,
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
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: Seo.image,
    },
  ];
};
