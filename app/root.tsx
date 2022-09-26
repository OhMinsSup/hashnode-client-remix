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

import cookies from "cookie";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";

// api
import { getUserInfoApi } from "./api/user/user";
import { QUERIES_KEY } from "./constants/constant";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const globalClient = new QueryClient();

const getUserInfo = async (access_token: string) => {
  const data = await getUserInfoApi({
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
  return data.result.result;
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;
  const { access_token } = cookies.parse(cookie);
  if (!access_token) return null;
  try {
    const client = new QueryClient();
    await client.fetchQuery(QUERIES_KEY.ME, () => getUserInfo(access_token), {
      staleTime: 10000,
    });
    return json({
      dehydratedState: dehydrate(client),
    });
  } catch (error) {
    console.error("error", error);
    return json({});
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
  const loadData = useLoaderData();

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
