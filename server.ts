import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

import { EnvSchema, type RuntimeEnv } from "./app/services/app/env.server";

import { AuthApiService } from "./app/services/api/auth.server";
import { UserApiService } from "./app/services/api/user.server";
import { TagApiService } from "./app/services/api/tag.server";
import { FileApiService } from "./app/services/api/file.server";
import { PostApiService } from "./app/services/api/post.server";

import { ThemeService } from "./app/services/app/theme.server";
import { ServerService } from "./app/services/app/server.server";
import { ImagesService } from "./app/services/app/images.server";
import { CsrfService } from "./app/services/app/csrf.server";
import { HoneypotService } from "./app/services/app/honeypot.server";

import * as build from "@remix-run/dev/server-build";

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
      csrf: new CsrfService(env),
      honeypot: new HoneypotService(env),
    };

    const api = {
      auth: new AuthApiService(
        env,
        services.server,
        services.csrf,
        services.honeypot
      ),
      user: new UserApiService(env, services.server),
      post: new PostApiService(env, services.server),
      tag: new TagApiService(env, services.server),
      file: new FileApiService(env, services.server),
    };

    return {
      ...context.env,
      services,
      api,
    };
  },
});
