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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
  userId: number;
  user: UserSchema;
  tags: TagSchema[];
}
