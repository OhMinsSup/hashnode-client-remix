import { EnvSchema } from "./app/env.server";

import { UserApiService } from "./api/user.server";
import { TagApiService } from "./api/tag.server";
import { FileApiService } from "./api/file.server";
import { PostApiService } from "./api/post.server";
import { NotificationApiService } from "./api/notification.server";

import { ThemeService } from "./app/theme.server";
import { ToastService } from "./app/toast.server";
import { ServerService } from "./app/server.server";
import { ImagesService } from "./app/images.server";
import { CsrfService } from "./app/csrf.server";
import { HoneypotService } from "./app/honeypot.server";

import { HashnodeAgent } from "./agent";
import { AppApiService } from "./api/app.server";
import { PostDraftApiService } from "./api/draft.server";
import { WidgetApiService } from "./api/widget.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLoadContext = (context: any) => {
  const env = EnvSchema.parse(context.env);

  const agent = new HashnodeAgent({
    service: env.API_BASE_URL,
    prefix: "/v1",
  });

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
    agent,
  };

  const api = {
    user: new UserApiService({
      env,
      services,
    }),
    post: new PostApiService({
      env,
      services,
    }),
    draft: new PostDraftApiService({
      env,
      services,
    }),
    widget: new WidgetApiService({
      env,
      services,
    }),
    tag: new TagApiService({
      env,
      services,
    }),
    file: new FileApiService(env, server, toast),
    notification: new NotificationApiService({
      env,
      services,
    }),
    app: new AppApiService({
      env,
      services,
    }),
  };

  return {
    env: context.env,
    services,
    api,
  };
};
