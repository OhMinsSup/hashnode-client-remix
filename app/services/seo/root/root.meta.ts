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
      charSet: "utf-8",
    },
    {
      tagName: "meta",
      viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: url.pathname,
    },
    {
      tagName: "link",
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      tagName: "link",
      rel: "search",
      href: "/opensearch.xml",
      type: "application/opensearchdescription+xml",
      title: "Hashnode",
    },
    {
      tagName: "link",
      rel: "preload",
      href: "/fonts/SuisseIntl-Book-WebXL.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      tagName: "link",
      rel: "preload",
      href: "/fonts/SuisseIntl-Medium-WebXL.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      tagName: "link",
      rel: "preload",
      href: "/fonts/SuisseIntl-SemiBold-WebXL.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      tagName: "link",
      rel: "preload",
      href: "/fonts/SuisseIntl-Bold-WebXL.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
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
    {
      tagName: "link",
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/images/logo_180x180.png",
    },
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/images/logo_32x32.png",
    },
    {
      tagName: "link",
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/images/logo_16x16.png",
    },
    {
      tagName: "link",
      rel: "mask-icon",
      href: "/images/safari-pinned-tab-new.svg",
      color: "#2962ff",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: url.href,
        name: Seo.title,
        description: Seo.description,
        image: Seo.image,
      },
    },
  ];
};
