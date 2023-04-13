import React from "react";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// types
import type {
  V2_MetaFunction,
  HeadersFunction,
  LinksFunction,
} from "@remix-run/cloudflare";

// styles
import homeListStyle from "~/styles/routes/home-list.css";
import homeNStyle from "~/styles/routes/home-n.css";
import TabRoutesTagPosts from "~/components/n/TabRoutesTagPosts";

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
      href: homeListStyle,
    },
    {
      rel: "stylesheet",
      href: homeNStyle,
    },
  ];
};

export const header: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=120",
  };
};

export default function N() {
  return (
    <div className="main__list-container">
      <div className="content-info-box">
        <h1>Explore Tech Blogs &amp; Tags</h1>
        <p>
          Everything that's… Hashnode. Explore the most popular tech blogs from
          the Hashnode community. A constantly updating list of popular tags and
          the best minds in tech.
        </p>
      </div>
      <div className="main__list-container__tabs">
        <TabRoutesTagPosts>
          <Outlet />
        </TabRoutesTagPosts>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
