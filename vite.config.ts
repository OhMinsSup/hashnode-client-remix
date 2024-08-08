import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
// import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { getLoadContext } from './load-context';

export default defineConfig(({ mode }) => {
  return {
    build: {
      cssMinify: mode === 'production',
    },
    plugins: [
      remixCloudflareDevProxy({
        getLoadContext,
      }),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          unstable_singleFetch: true,
        },
      }),
      tsconfigPaths(),
      // mode === 'production' &&
      //   sentryVitePlugin({
      //     org: process.env.SENTRY_ORG,
      //     project: process.env.SENTRY_PROJECT,
      //     authToken: process.env.SENTRY_AUTH_TOKEN,
      //   }),
    ],
  };
});
