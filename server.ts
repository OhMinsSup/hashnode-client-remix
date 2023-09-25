import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

import { EnvSchema } from "./services/env";

import { AuthApiService } from "./services/api/auth";
import { UserApiService } from "./services/api/user";
import { TagApiService } from "./services/api/tag";
import { FileApiService } from "./services/api/file";
import { PostApiService } from "./services/api/post";

import { ThemeService } from "./services/app/theme";
import { ServerService } from "./services/app/server";
import { ImagesService } from "services/app/images";

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
      images: new ImagesService(env),
    };

    const api = {
      auth: new AuthApiService(env, services.server),
      user: new UserApiService(env, services.server),
      post: new PostApiService(env, services.server),
      tag: new TagApiService(env),
      file: new FileApiService(env, services.server),
    };

    return {
      ...context.env,
      services,
      api,
    };
  },
});
