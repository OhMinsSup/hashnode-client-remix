/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

import type { KVNamespace } from "@cloudflare/workers-types";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: {
      cache: KVNamespace;
      API_BASE_URL: string;
      COOKIE_SESSION_SECRET: string;
      TOAST_SECRET: string;
      CSRF_SECRET: string;
      HONEYPOT_SECRET: string;
      CF_ID: string;
      CF_API_TOKEN: string;
    };
  }
}
