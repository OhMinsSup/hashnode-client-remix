import type { Nullable } from "./api";
import type { MediaType, UploadType } from "./file";

export interface SignupBody {
  username: string;
  email: string;
  name?: string | null;
  password: string;
}

export interface SigninBody {
  email: string;
  password: string;
}

export interface PostBody {
  title: string;
  subTitle?: Nullable<string>;
  content: string;
  description: string;
  thumbnail?: Nullable<string>;
  tags: string[];
}

export interface UploadBody {
  file: File;
  uploadType: UploadType;
  mediaType: MediaType;
}
