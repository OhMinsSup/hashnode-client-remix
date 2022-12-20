import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/blur-up/ls.blur-up";
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

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider, useCreateAuthStore } from "./stores/useAuthStore";

import cookies from "cookie";

// api
import { getUserInfoApi } from "~/api/user/user";
import { applyAuth } from "./libs/server/applyAuth";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStylesheetUrl from "./styles/custom.css";
import rcDrawerStylesheetUrl from "rc-drawer/assets/index.css";

// types
import type { UserRespSchema } from "./api/schema/resp";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStylesheetUrl },
    { rel: "stylesheet", href: rcDrawerStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const token = applyAuth(request);

  let profile: UserRespSchema | null = null;

  if (token) {
    try {
      const { result } = await getUserInfoApi({
        hooks: {
          beforeRequest: [
            (request) => {
              request.headers.set(
                "Cookie",
                cookies.serialize("access_token", token)
              );
              return request;
            },
          ],
        },
      });
      profile = result.result;
    } catch (error) {
      profile = null;
    }
  }

  return json({
    isLoggedIn: !!token,
    currentProfile: profile,
  });
};

export default function App() {
  const { currentProfile, isLoggedIn } = useLoaderData<{
    currentProfile: UserRespSchema | null;
    isLoggedIn: boolean;
  }>();

  const createAuthStore = useCreateAuthStore({
    isLoggedIn,
    currentProfile,
  });

  return (
    <AuthProvider createStore={createAuthStore}>
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
            <LiveReload port={8002} />
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </html>
      </QueryClientProvider>
    </AuthProvider>
  );
}
