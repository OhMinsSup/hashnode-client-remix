import { useEffect, useMemo } from "react";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  LiveReload,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cssBundleHref } from "@remix-run/css-bundle";

import classNames from "classnames";
import { getDomainUrl, removeTrailingSlash } from "./utils/util";

import NotFoundPage from "./components/errors/NotFoundPage";
import InternalServerPage from "./components/errors/InternalServerPage";
import { Body } from "./components/shared/future/Body";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "./context/useThemeContext";

// api
import { ASSET_URL } from "./constants/constant";

// styles
import globalStyles from "~/styles/global.css";

// types
import type {
  LoaderArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import type { Theme } from "./context/useThemeContext";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  const env = {
    API_BASE_URL: context.API_BASE_URL,
  };

  const $object = {
    currentProfile: null,
    theme: null,
    origin: getDomainUrl(request),
  } as {
    currentProfile: FetchRespSchema.UserRespSchema | null;
    env: typeof env;
    theme: Theme | null;
    origin: string;
  };

  try {
    const [session, theme] = await Promise.all([
      context.api.auth.getSession(request),
      context.services.theme.getTheme(request),
    ]);

    const $data = Object.assign({}, $object, {
      currentProfile: session,
      theme,
    });

    return json(
      $data,
      session
        ? undefined
        : {
            headers: context.api.auth.getClearAuthHeaders(),
          }
    );
  } catch (error) {
    return json($object);
  }
};

export type Loader = typeof loader;

export const meta: V2_MetaFunction<Loader> = ({ location, data }) => {
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

function CanonicalLink({ origin }: { origin: string }) {
  const { pathname } = useLocation();
  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`);

  useEffect(() => {}, [canonicalUrl]);

  return <link rel="canonical" href={canonicalUrl} />;
}

function ExternalLink() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="search"
        href="/opensearch.xml"
        type="application/opensearchdescription+xml"
        title="Hashnode"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/logo_180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/logo_32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/logo_16x16.png"
      />
      <link
        rel="mask-icon"
        href="/images/safari-pinned-tab-new.svg"
        color="#2962ff"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Book-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Medium-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-SemiBold-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Bold-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}

function Metas() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#0F172A" />
    </>
  );
}

function App() {
  const [theme] = useTheme();
  const data = useLoaderData<Loader>();

  const client = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  }, []);

  return (
    <html lang="en" className={classNames(theme)}>
      <head>
        <Metas />
        <CanonicalLink origin={data.origin} />
        <ExternalLink />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <QueryClientProvider client={client}>
        <Body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Body>
      </QueryClientProvider>
    </html>
  );
}

function AppError() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <Metas />
        <ExternalLink />
        <Meta />
        <Links />
      </head>
      <Body>
        <>
          {isRouteErrorResponse(error) ? (
            <>
              {error.status !== 500 ? <NotFoundPage /> : <InternalServerPage />}
            </>
          ) : (
            <InternalServerPage />
          )}
        </>
        <Scripts />
      </Body>
    </html>
  );
}

export default function Routes() {
  const data = useLoaderData<Loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  return (
    <ThemeProvider specifiedTheme={null}>
      <AppError />
    </ThemeProvider>
  );
}
