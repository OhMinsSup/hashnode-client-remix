import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const globalClient = new QueryClient();

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <QueryClientProvider client={globalClient}>
      <html lang="kr">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="bg-white leading-6">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
