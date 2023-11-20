import type { RemixContext } from "./app/services/types";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends RemixContext {}
}

declare module "@remix-run/cloudflare" {
  export interface AppLoadContext extends RemixContext {}
}
