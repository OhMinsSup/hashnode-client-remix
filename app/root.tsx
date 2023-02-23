import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/blur-up/ls.blur-up";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  LiveReload,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { globalClient } from "./api/client";

import { SSRProvider } from "react-aria";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./stores/useAuthContext";

// api
import { getSessionApi } from "~/api/user/user";

// styles
import tailwindStylesheetUrl from "./styles/tailwind.css";
import mainStylesheetUrl from "./styles/main.css";
import commonStylesheetUrl from "./styles/common.css";
import rcDrawerStylesheetUrl from "rc-drawer/assets/index.css";

// types
import type { UserRespSchema } from "./api/schema/resp";
import type {
  LoaderArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: mainStylesheetUrl },
    { rel: "stylesheet", href: commonStylesheetUrl },
    { rel: "stylesheet", href: rcDrawerStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

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

export default function App() {
  const { currentProfile, isLoggedIn } = useLoaderData<{
    currentProfile: UserRespSchema | null;
    isLoggedIn: boolean;
  }>();

  return (
    <AuthProvider currentProfile={currentProfile} isLoggedIn={isLoggedIn}>
      <QueryClientProvider client={globalClient}>
        <SSRProvider>
          <html lang="kr">
            <head>
              <Meta />
              <Links />
            </head>
            <body>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload port={8002} />
              <ReactQueryDevtools initialIsOpen={false} />
            </body>
          </html>
        </SSRProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
