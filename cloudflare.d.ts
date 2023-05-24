import type { AuthApiService } from "./services/api/auth";
import type { UserApiService } from "./services/api/user";
import type { AuthService } from "./services/auth";
import type { Env } from "./services/env";

// remix.run load, action cloudflare pages context
interface RuntimeEnv {
  auth: KVNamespace;
  [key: string]: unknown;
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    API_BASE_URL: Env["API_BASE_URL"];
    COOKIE_SESSION_SECRET: Env["COOKIE_SESSION_SECRET"];
    services: {
      auth: AuthService;
    };
    api: {
      auth: AuthApiService;
      user: UserApiService;
    };
  }
}
