import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Toaster, toast as showToast } from "sonner";
import classNames from "classnames";
import { ExternalLink } from "~/components/shared/future/ExternalLink";
import { CanonicalLink } from "~/components/shared/future/CanonicalLink";
import { Body } from "~/components/shared/future/Body";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "~/context/useThemeContext";
import "~/styles/global.css";
import type { Theme } from "~/context/useThemeContext";
import type { Toast } from "./services/validate/toast.validate";
import { useEffect, useRef, useState } from "react";
import {
  rootLoader,
  type RoutesLoaderData,
} from "~/.server/routes/root/root-loader";
import { rootMeta } from "~/.client/root/root-meta";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const loader = rootLoader;

export const meta = rootMeta;

function ShowToast({ toast }: { toast: Toast }) {
  const { id, type, title, description } = toast;
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      showToast[type](title, {
        id,
        description,
        onAutoClose: () => {
          if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
          }
        },
      });
    }, 0);
  }, [description, id, title, type]);
  return null;
}

function Document({
  children,
  origin,
  theme,
  env,
}: {
  children: React.ReactNode;
  origin?: string;
  theme?: Theme | null;
  env?: Record<string, string>;
}) {
  return (
    <html
      id="current-style"
      lang="en"
      itemScope
      itemType="http://schema.org/WebSite"
      className={classNames(theme)}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <CanonicalLink origin={origin} />
        <ExternalLink />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <Body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <Toaster closeButton position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </Body>
    </html>
  );
}

function App() {
  const [theme] = useTheme();
  const data = useLoaderData<RoutesLoaderData>();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Document origin={data.origin} theme={theme} env={data.env}>
        <Outlet />
        {data.toast ? <ShowToast toast={data.toast} /> : null}
      </Document>
    </QueryClientProvider>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log("route ===>", error);
  return <>Error</>;
}
