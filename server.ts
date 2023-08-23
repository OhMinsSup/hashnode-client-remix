import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

import { EnvSchema } from "./services/env";

import { AuthApiService } from "./services/api/auth";
import { UserApiService } from "./services/api/user";
import { ItemApiService } from "./services/api/item";
import { WidgetApiService } from "./services/api/widget";
import { TagApiService } from "./services/api/tag";
import { DraftApiService } from "./services/api/draft";
import { FileApiService } from "./services/api/file";

import { ThemeService } from "./services/app/theme";
import { ServerService } from "./services/app/server";

import * as build from "@remix-run/dev/server-build";

import type { RuntimeEnv } from "./cloudflare";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler<RuntimeEnv>({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const env = EnvSchema.parse(context.env);

    const services = {
      theme: new ThemeService(env),
      server: new ServerService(env),
    };

    const api = {
      auth: new AuthApiService(env, services.server),
      user: new UserApiService(env, services.server),
      item: new ItemApiService(env),
      widget: new WidgetApiService(env),
      tag: new TagApiService(env),
      draft: new DraftApiService(env),
      file: new FileApiService(env),
    };

    return {
      ...context.env,
      services,
      api,
    };
  },
});
