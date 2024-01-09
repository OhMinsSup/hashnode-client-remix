import type { AuthApiService } from "./api/auth.server";
import type { UserApiService } from "./api/user.server";
import type { NotificationApiService } from "./api/notification.server";
import type { ThemeService } from "./app/theme.server";
import type { ServerService } from "./app/server.server";
import type { RuntimeEnv } from "./app/env.server";
import type { TagApiService } from "./api/tag.server";
import type { FileApiService } from "./api/file.server";
import type { ImagesService } from "./app/images.server";
import type { PostApiService } from "./api/post.server";
import type { CsrfService } from "./app/csrf.server";
import type { HoneypotService } from "./app/honeypot.server";
import type { ToastService } from "./app/toast.server";
import type { HashnodeAgent } from "./agent";

export type HashnodeServices = {
  theme: ThemeService;
  server: ServerService;
  images: ImagesService;
  csrf: CsrfService;
  honeypot: HoneypotService;
  toast: ToastService;
  agent: HashnodeAgent;
};

export type HashnodeApi = {
  auth: AuthApiService;
  user: UserApiService;
  tag: TagApiService;
  file: FileApiService;
  post: PostApiService;
  notification: NotificationApiService;
};

export type HashnodeApiConstructorOptions = {
  env: RuntimeEnv;
  services: HashnodeServices;
};

export interface RemixContext extends RuntimeEnv {
  services: HashnodeServices;
  api: HashnodeApi;
}
