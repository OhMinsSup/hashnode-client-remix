import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

import { EnvSchema, type RuntimeEnv } from "./app/services/app/env.server";

import { AuthApiService } from "./app/services/api/auth.server";
import { UserApiService } from "./app/services/api/user.server";
import { TagApiService } from "./app/services/api/tag.server";
import { FileApiService } from "./app/services/api/file.server";
import { PostApiService } from "./app/services/api/post.server";

import { ThemeService } from "./app/services/app/theme.server";
import { ToastService } from "./app/services/app/toast.server";
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

    const server = new ServerService(env);
    const theme = new ThemeService(env);
    const images = new ImagesService(env);
    const csrf = new CsrfService(env);
    const honeypot = new HoneypotService(env);
    const toast = new ToastService(env);

    const services = {
      server,
      theme,
      images,
      csrf,
      honeypot,
      toast,
    };

    const api = {
      auth: new AuthApiService(env, server, csrf, honeypot, toast),
      user: new UserApiService(env, server),
      post: new PostApiService(env, server),
      tag: new TagApiService(env, server, toast),
      file: new FileApiService(env, server),
    };

    return {
      ...context.env,
      services,
      api,
    };
  },
});
