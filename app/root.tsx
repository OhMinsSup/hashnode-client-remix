import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import cookies from "cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUserInfoApi } from "./api/user/user";

export const globalClient = new QueryClient();

export const loader: LoaderFunction = async ({ request, context }) => {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;
  const { access_token } = cookies.parse(cookie);
  if (!access_token) return null;

  try {
    const user = await getUserInfoApi({
      hooks: {
        beforeRequest: [
          (request) => {
            //  set-cookie
            request.headers.set(
              "Cookie",
              cookies.serialize("access_token", access_token)
            );
            return request;
          },
        ],
      },
    });
    return user;
  } catch (error) {
    console.log("error", error);
  }

  return null;
};

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
      <RecoilRoot>
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
      </RecoilRoot>
    </QueryClientProvider>
  );
}
