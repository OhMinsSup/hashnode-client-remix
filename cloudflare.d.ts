import type { ItemApiService } from "services/api/item";
import type { AuthApiService } from "./services/api/auth";
import type { UserApiService } from "./services/api/user";
import type { ThemeService } from "./services/app/theme";
import type { ServerService } from "./services/app/server";
import type { Env } from "./services/env";
import type { TagApiService } from "./services/api/tag";
import type { WidgetApiService } from "./services/api/widget";
import type { DraftApiService } from "./services/api/draft";
import type { FileApiService } from "services/api/file";

// remix.run load, action cloudflare pages context
export interface RuntimeEnv {
  API_BASE_URL: Env["API_BASE_URL"];
  COOKIE_SESSION_SECRET: Env["COOKIE_SESSION_SECRET"];
  CF_ID: Env["CF_ID"];
  CF_API_TOKEN: Env["CF_API_TOKEN"];
  [key: string]: unknown;
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends RuntimeEnv {
    services: {
      theme: ThemeService;
      server: ServerService;
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
