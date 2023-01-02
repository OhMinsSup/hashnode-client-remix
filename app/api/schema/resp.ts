import type { Nullable } from "./api";
import type { FileSchema } from "./file";
import type { UserSchema } from "./user";
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

export interface PostDetailRespSchema extends PostSchema {
  count: {
    postLike: number;
  };
}

export interface PostLikeRespSchema extends PostDetailRespSchema {
  cursorId: number;
}

export interface PostListRespSchema
  extends ListRespSchema<PostDetailRespSchema> {}

export interface PostLikeListRespSchema
  extends ListRespSchema<PostLikeRespSchema> {}

export interface GetTopPostsRespSchema {
  posts: PostDetailRespSchema[];
}
