import React from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// api
import { getSessionApi } from "~/api/user/user";

// types
import type {
  LoaderArgs,
  V2_MetaFunction,
  HeadersFunction,
  LinksFunction,
} from "@remix-run/cloudflare";

// styles
import homeListStyle from "~/styles/routes/home-list.css";
import homeBookmarkStyle from "~/styles/routes/home-bookmark.css";

const Seo = {
  title: "Bookmarks - Hashnode",
  description: "Bookmarks - Hashnode",
  image: "/images/seo_image.png",
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: homeListStyle },
    { rel: "stylesheet", href: homeBookmarkStyle },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  if (!session) {
    return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
      headers,
    });
  }

  return json(
    {},
    {
      headers,
    }
  );
};

export const header: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=120",
  };
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

export default function Bookmarks() {
  return (
    <div className="relative col-span-7 min-w-0 pb-5 pt-5">
      <div className="content-info-box">
        <h1>Bookmarks</h1>
        <p>All articles you have bookmarked on Hashnode</p>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <Outlet />
      </div>
    </div>
  );
}
