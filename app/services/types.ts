import type { AuthApiService } from "./api/auth.server";
import type { UserApiService } from "./api/user.server";
import type { ThemeService } from "./app/theme.server";
import type { ServerService } from "./app/server.server";
import type { RuntimeEnv } from "./app/env.server";
import type { TagApiService } from "./api/tag.server";
import type { FileApiService } from "./api/file.server";
import type { ImagesService } from "./app/images.server";
import type { PostApiService } from "./api/post.server";
import type { CsrfService } from "./app/csrf.server";
import type { HoneypotService } from "./app/honeypot.server";

export interface RemixContext extends RuntimeEnv {
  services: {
    theme: ThemeService;
    server: ServerService;
    images: ImagesService;
    csrf: CsrfService;
    honeypot: HoneypotService;
  };
  api: {
    auth: AuthApiService;
    user: UserApiService;
    tag: TagApiService;
    file: FileApiService;
    post: PostApiService;
  };
}
