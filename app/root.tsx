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
import { cssBundleHref } from "@remix-run/css-bundle";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
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

// api
import { ASSET_URL } from "~/constants/constant";

// styles
import globalStyles from "~/styles/global.css";

// types
import type { Theme } from "~/context/useThemeContext";
import type { Toast } from "./services/validate/toast.validate";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { useEffect, useRef } from "react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const getSessionApi = context.api.auth.getSession(request);

  const { data, headers } = await context.api.app.root(request, getSessionApi);
  return json(data, {
    headers,
  });
};

export type RoutesData = typeof loader;

export const meta: MetaFunction<RoutesData> = ({ location, data }) => {
  const url = new URL(location.pathname, data?.origin);
  const Seo = {
    title: "Hashnode - Blogging community for developers, and people in tech",
    description:
      "Start a blog for free instantly and share your ideas with people in tech, developers, and engineers. Hashnode is a free blogging platform.",
    image: ASSET_URL.SEO_IMAGE,
  };
  return [
    {
      title: Seo.title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:site_name",
      content: "Hashnode",
    },
    {
      name: "og:url",
      content: url.href,
    },
    {
      name: "og:image",
      content: Seo.image,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: Seo.image,
    },
  ];
};

function ShowToast({ toast }: { toast: Toast }) {
  const { id, type, title, description } = toast;
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      showToast[type](title, {
        id,
        description,
        onAutoClose: (toast) => {
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#0F172A" />
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
        <LiveReload />
      </Body>
    </html>
  );
}

function App() {
  const [theme] = useTheme();
  const data = useLoaderData<RoutesData>();

  return (
    <Document origin={data.origin} theme={theme} env={data.env}>
      <Outlet />
      {data.toast ? <ShowToast toast={data.toast} /> : null}
    </Document>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<RoutesData>();
  return (
    <HoneypotProvider {...data.honeyProps}>
      <AuthenticityTokenProvider token={data.csrfToken}>
        <ThemeProvider specifiedTheme={data.theme}>
          <App />
        </ThemeProvider>
      </AuthenticityTokenProvider>
    </HoneypotProvider>
  );
}

export function ErrorBoundary() {
  return <Document>Error</Document>;
}
