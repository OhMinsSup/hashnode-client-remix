import {
  json,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { globalClient } from "./api/client";

import cookies from "cookie";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

// api
import { getUserInfoSsrApi } from "./api/user";
import { QUERIES_KEY } from "./constants/constant";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  const client = new QueryClient();

  const resp = {
    dehydratedState: dehydrate(client),
  };

  try {
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) {
        await client.fetchQuery(
          QUERIES_KEY.ME,
          () => getUserInfoSsrApi(access_token),
          {
            staleTime: 10000,
          }
        );
      }
    }

    return json(resp);
  } catch (error) {
    return json(resp);
  }
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
  const loadData = useLoaderData<{ dehydratedState: DehydratedState }>();

  return (
    <QueryClientProvider client={globalClient}>
      <Hydrate state={loadData.dehydratedState}>
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
      </Hydrate>
    </QueryClientProvider>
  );
}
