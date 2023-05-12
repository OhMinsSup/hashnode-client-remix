import { json } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  LiveReload,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NotFoundPage from "./components/errors/NotFoundPage";
import InternalServerPage from "./components/errors/InternalServerPage";

// api
import Json from "superjson";
import { getSessionApi } from "~/libs/server/session.server";
import { ApiService } from "./api/client.next";
import { ASSET_URL } from "./constants/constant";

// styles
import globalStyles from "~/styles/global.css";

// types
import type {
  LoaderArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useMemo } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const loader = async (args: LoaderArgs) => {
  ApiService.setBaseUrl(
    // @ts-ignore
    args.context.API_BASE_URL || "http://localhost:8080/api/v1"
  );
  const env = {
    API_BASE_URL: ApiService.baseUrl,
  };
  const { session, header: headers } = await getSessionApi(args);
  if (!session) {
    return json(
      { currentProfile: null, env },
      {
        headers,
      }
    );
  }
  return json(
    { currentProfile: session, env },
    {
      headers,
    }
  );
};

export type RootLoader = typeof loader;

export const meta: V2_MetaFunction<RootLoader> = ({ location }) => {
  const url = new URL(location.pathname, "http://localhost:8788");
  const Seo = {
    title: "Hashnode - Blogging community for developers, and people in tech",
    description:
      "Start a blog for free instantly and share your ideas with people in tech, developers, and engineers. Hashnode is a free blogging platform.",
    image: ASSET_URL.SEO_IMAGE,
  };
  return [
    {
      tagName: "link",
      rel: "canonical",
      href: url.href,
    },
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

export default function App() {
  const { env } = useLoaderData<RootLoader>();
  const client = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={client}>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#0F172A" />
          <Meta />
          <Links />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="search"
            href="/opensearch.xml"
            type="application/opensearchdescription+xml"
            title="Hashnode"
          />
        </head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${Json.stringify(env)}`,
            }}
          />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#0F172A" />
        <Meta />
        <Links />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <>
          {isRouteErrorResponse(error) ? (
            <>
              {error.status !== 500 ? <NotFoundPage /> : <InternalServerPage />}
            </>
          ) : (
            <InternalServerPage />
          )}
        </>
        <NotFoundPage />
        <Scripts />
      </body>
    </html>
  );
}
