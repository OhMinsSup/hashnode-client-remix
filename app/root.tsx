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

// api
import { getSessionApi, logoutApi } from "~/api/user/user";

// styles
// import tailwindStylesheetUrl from "./styles/tailwind.css";
// import mainStylesheetUrl from "./styles/main.css";
// import commonStylesheetUrl from "./styles/common.css";
// import rcDrawerStylesheetUrl from "rc-drawer/assets/index.css";
import globalStyles from "~/styles/global.css";

// types
import type {
  ActionArgs,
  LoaderArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";

// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: tailwindStylesheetUrl },
//     { rel: "stylesheet", href: mainStylesheetUrl },
//     { rel: "stylesheet", href: commonStylesheetUrl },
//     { rel: "stylesheet", href: rcDrawerStylesheetUrl },
//   ];
// };

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hashnode - Blogging community for developers, and people in tech",
  description:
    "Start a blog for free instantly and share your ideas with people in tech, developers, and engineers. Hashnode is a free blogging platform.",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
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
