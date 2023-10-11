import type { AuthApiService } from "./api/auth";
import type { UserApiService } from "./api/user";
import type { ThemeService } from "./app/theme";
import type { ServerService } from "./app/server";
import type { RuntimeEnv } from "./env";
import type { TagApiService } from "./api/tag";
import type { FileApiService } from "./api/file";
import type { ImagesService } from "./app/images";
import type { PostApiService } from "./api/post";

export interface RemixContext extends RuntimeEnv {
  services: {
    theme: ThemeService;
    server: ServerService;
    images: ImagesService;
  };
  api: {
    auth: AuthApiService;
    user: UserApiService;
    tag: TagApiService;
    file: FileApiService;
    post: PostApiService;
  };
}
