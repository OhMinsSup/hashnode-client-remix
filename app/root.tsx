import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import { Body } from '~/components/shared/future/Body';
import { ShowToast, Toaster } from '~/components/ui/sonner';
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from '~/context/useThemeContext';

import '~/styles/global.css';

import { defineClientLoader } from '@remix-run/react/dist/single-fetch';

import type { Theme } from '~/context/useThemeContext';
import { type RoutesLoaderData } from '~/.server/routes/root/root.loader';
import { LayoutSizeMeasuringMachine } from '~/components/shared/future/LayoutSizeMeasuringMachine';
import { cn } from '~/services/libs';
import { ClientQueryProvider } from '~/services/react-query';
import { DefaultLinks } from './components/shared/future/DefaultLinks';
import { DefaultMetas } from './components/shared/future/DefaultMetas';
import { useEnvStore } from './services/store/useEnvStore';

export { loader } from '~/.server/routes/root/root.loader';
export { meta } from '~/services/seo/root/root.meta';

export const clientLoader = defineClientLoader(async ({ serverLoader }) => {
  // call the server loader
  const serverData = await serverLoader<RoutesLoaderData>();

  useEnvStore.setState({
    apiHost: serverData.env.apiHost,
  });

  return serverData;
});

clientLoader.hydrate = true;

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
        <DefaultMetas />
        <DefaultLinks origin={origin} />
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
