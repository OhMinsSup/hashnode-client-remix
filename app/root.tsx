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
        <html lang="kr">
          <head>
            <meta charSet="utf-8" />
            <meta property="og:site_name" content="Hashnode" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://hashnode.com/" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#0F172A" />
            <Meta />
            <Links />
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
        <meta charSet="utf-8" />
        <meta property="og:site_name" content="Hashnode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hashnode.com/" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#0F172A" />
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
