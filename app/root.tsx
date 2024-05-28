import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { toast as showToast } from 'sonner';

import { Body } from '~/components/shared/future/Body';
import { Toaster } from '~/components/ui/sonner';
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from '~/context/useThemeContext';

import '~/styles/global.css';

import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import type { Theme } from '~/context/useThemeContext';
import type { Toast } from '~/services/validate/toast.validate';
import { type RoutesLoaderData } from '~/.server/routes/root/root.loader';
import { LayoutSizeMeasuringMachine } from '~/components/shared/future/LayoutSizeMeasuringMachine';
import { cn } from '~/services/libs';
import { ClientQueryProvider } from '~/services/react-query';

export { loader } from '~/.server/routes/root/root.loader';
export { meta } from '~/services/seo/root/root.meta';

dayjs.extend(utc);
dayjs.extend(timezone);

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

interface DocumentProps {
  children: React.ReactNode;
  theme?: Theme | null;
  origin?: string;
  env?: Record<string, string>;
}

function Document({ children, theme, origin, env }: DocumentProps) {
  return (
    <html
      id="current-style"
      lang="en"
      itemScope
      itemType="http://schema.org/WebSite"
      className={cn(theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={origin} />
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

  return (
    <ClientQueryProvider>
      <Document theme={theme} env={data.env} origin={data.origin}>
        <Outlet />
        {data.toast ? <ShowToast toast={data.toast} /> : null}
        <LayoutSizeMeasuringMachine />
      </Document>
    </ClientQueryProvider>
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
  console.log('route ===>', error);
  return <>Error</>;
}
