import type { Nullable } from "./api";
import type { UserSchema, UserSocialSchema } from "./user";
import type { TagSchema } from "./tag";

export interface PostCountSchema {
  postLike: number;
}

export interface PostSchema {
  id: number;
  title: string;
  subTitle: Nullable<string>;
  content: string;
  description: string;
  thumbnail: Nullable<string>;
  disabledComment: boolean;
  publishingDate: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: UserSchema;
  tags: Pick<TagSchema, "id" | "name">[];
  seo?: UserSocialSchema;
  count: PostCountSchema;
}
