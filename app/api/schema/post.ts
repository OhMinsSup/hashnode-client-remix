import type { Nullable } from "./api";
import type { UserSchema } from "./user";
import type { TagSchema } from "./tag";

export interface PostSchema {
  id: number;
  title: string;
  subTitle: Nullable<string>;
  content: string;
  description: string;
  thumbnail: Nullable<string>;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Nullable<Date | string>;
  userId: number;
  user: UserSchema;
  tags: TagSchema[];
}
