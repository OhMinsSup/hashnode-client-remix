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

import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const env = EnvSchema.parse(context.env);
    return {
      ...context.env,
      services: {
        theme: new ThemeService(env),
      },
      api: {
        auth: new AuthApiService(env),
        user: new UserApiService(env),
        item: new ItemApiService(env),
        widget: new WidgetApiService(env),
        tag: new TagApiService(env),
        draft: new DraftApiService(env),
        file: new FileApiService(env),
      },
    };
  },
});
