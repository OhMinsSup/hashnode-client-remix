import type { ItemApiService } from "services/api/item";
import type { AuthApiService } from "./services/api/auth";
import type { UserApiService } from "./services/api/user";
import type { ThemeService } from "./services/data/theme";
import type { Env } from "./services/env";
import type { TagApiService } from "./services/api/tag";
import type { WidgetApiService } from "./services/api/widget";
import type { DraftApiService } from "./services/api/draft";
import type { FileApiService } from "services/api/file";

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
      theme: ThemeService;
    };
    api: {
      auth: AuthApiService;
      user: UserApiService;
      item: ItemApiService;
      tag: TagApiService;
      widget: WidgetApiService;
      draft: DraftApiService;
      file: FileApiService;
    };
  }
}
