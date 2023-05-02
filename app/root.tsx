import { json } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  LiveReload,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { globalClient } from "./api/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { LayoutProvider } from "./context/useLayoutContext";
import NotFoundPage from "./components/errors/NotFoundPage";

// api
import { getSessionApi, logoutApi } from "~/api/user/user";

// styles
import globalStyles from "~/styles/global.css";

// types
import type {
  ActionArgs,
  LoaderArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  const data = { isLoggedIn: false, currentProfile: null };
  if (!session) {
    return json(data, {
      headers,
    });
  }
  Object.assign(data, {
    isLoggedIn: true,
    currentProfile: session,
  });
  return json(data, {
    headers,
  });
};

export type RootLoader = typeof loader;

export const meta: V2_MetaFunction<RootLoader> = ({ location }) => {
  const origin = "http://localhost:8788";
  return [
    {
      tagName: "link",
      rel: "canonical",
      href: `${origin}${location.pathname}`,
    },
  ];
};

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();
  const type = formData.get("type");
  switch (type) {
    case "logout": {
      try {
        const resp = await logoutApi(args);
        return json(
          {},
          resp?.header
            ? {
                headers: resp.header,
              }
            : undefined
        );
      } catch (error) {
        return json({});
      }
    }
    default: {
      return json({});
    }
  }
};

export default function App() {
  return (
    <QueryClientProvider client={globalClient}>
      <LayoutProvider>
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
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </LayoutProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <NotFoundPage />
        <Scripts />
      </body>
    </html>
  );
}
