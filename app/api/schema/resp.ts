import type { Nullable } from "./api";
import type { FileSchema } from "./file";
import type { UserProfileSchema, UserSchema } from "./user";
import type { TagSchema } from "./tag";
import type { PostSchema } from "./post";

export interface ListRespSchema<Item = Record<string, any>> {
  list: Item[];
  totalCount: number;
  pageInfo: {
    endCursor: Nullable<number>;
    hasNextPage: boolean;
  };
}

export interface AuthRespSchema {
  userId: number;
  accessToken: string;
}

export interface UserRespSchema extends UserSchema {}

export interface PostRespSchema {
  dataId: number;
}

export interface TagWithPostCountSchema extends Omit<TagSchema, "deletedAt"> {
  postsCount: number;
}

export interface UploadRespSchema
  extends Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> {}

export interface FileListRespSchema
  extends ListRespSchema<Omit<FileSchema, "deletedAt">> {}

export interface TagListRespSchema
  extends ListRespSchema<TagWithPostCountSchema> {}

export interface PostListRespSchema
  extends ListRespSchema<Record<string, any>> {}

export type SimpleTrendingPostItemSchema = Omit<
  PostSchema,
  "deletedAt" | "userId"
> & {
  user: Pick<UserSchema, "id" | "email" | "username"> & {
    profile: Omit<
      UserProfileSchema,
      "name" | "bio" | "avatarUrl" | "availableText" | "location" | "website"
    >;
  };
};

export interface SimpleTrendingPostsRespSchema {
  list: SimpleTrendingPostItemSchema[];
  hasNextPage: boolean;
}
