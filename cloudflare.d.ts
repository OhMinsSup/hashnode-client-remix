import type { AuthService } from "services/auth";
import type { Env } from "services/env";

// remix.run load, action cloudflare pages context
interface RuntimeEnv {
  auth: KVNamespace;
  [key: string]: unknown;
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    env: Env;
    services: {
      auth: AuthService;
    };
  }
}
