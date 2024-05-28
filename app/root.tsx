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

import { type RoutesLoaderData } from '~/.server/routes/root/root.loader';
import { DefaultLinks } from '~/components/shared/future/DefaultLinks';
import { DefaultMetas } from '~/components/shared/future/DefaultMetas';
import { LayoutSizeMeasuringMachine } from '~/components/shared/future/LayoutSizeMeasuringMachine';
import { cn } from '~/services/libs';
import { ClientQueryProvider } from '~/services/react-query';
import { useEnvStore } from '~/services/store/useEnvStore';

export { loader } from '~/.server/routes/root/root.loader';
export { action } from '~/.server/routes/root/root.action';
export { meta } from '~/services/seo/root/root.meta';

export const clientLoader = defineClientLoader(async ({ serverLoader }) => {
  // call the server loader
  const serverData = await serverLoader<RoutesLoaderData>();

  useEnvStore.setState(serverData.env);

  return serverData;
});

clientLoader.hydrate = true;

interface DocumentProps {
  children: React.ReactNode;
}

function Document({ children }: DocumentProps) {
  const [theme] = useTheme();
  const data = useLoaderData<RoutesLoaderData>();
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
        <DefaultLinks origin={data.origin} />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <Body>
        {children}
        <Toaster closeButton position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </Body>
    </html>
  );
}

function App() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <ClientQueryProvider>
      <Document>
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
