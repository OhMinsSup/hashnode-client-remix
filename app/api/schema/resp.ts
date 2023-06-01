import type { Nullable } from "./api";
import type { FileSchema } from "./file";
import type { UserSchema, UserProfileSchema } from "./user";
import type { TagSchema } from "./tag";
import type { PostSchema, PostCountSchema } from "./post";
import type { DraftSchema } from "./draft";

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

export interface DraftRespSchema extends PostRespSchema {}

export interface TagWithPostCountSchema extends Omit<TagSchema, "deletedAt"> {
  postsCount: number;
}

export interface UploadRespSchema
  extends Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> {}

export interface FileListRespSchema
  extends ListRespSchema<Omit<FileSchema, "deletedAt">> {}

export interface TagListRespSchema
  extends ListRespSchema<TagWithPostCountSchema> {}

export interface TagDetailRespSchema {
  id: number;
  name: string;
  postCount: number;
  followCount: number;
  isFollowing: boolean;
}

export interface TagFollowRespSchema {
  dataId: number;
  count: number;
}

export interface PostDetailRespSchema extends PostSchema {
  count: PostCountSchema;
}

export interface PostLikeRespSchema extends PostDetailRespSchema {
  cursorId: number;
}

export interface PostListRespSchema
  extends ListRespSchema<PostDetailRespSchema> {}

export interface PostLikeListRespSchema
  extends ListRespSchema<PostLikeRespSchema> {}

export type ExploreBlogsListRespSchema = Array<{
  id: number;
  email: string;
  username: string;
  avatarUrl: string | null;
  posts: Array<
    Pick<PostDetailRespSchema, "id" | "title"> & { createdAt: number }
  >;
}>;

export interface GetTopPostsRespSchema {
  posts: PostDetailRespSchema[];
}

export interface DraftListRespSchema extends ListRespSchema<DraftSchema> {}

export interface GetAritcleCircleRespSchema {
  id: number;
  username: string;
  email: string;
  profile: Pick<UserProfileSchema, "name" | "bio" | "avatarUrl" | "tagline">;
  count: PostCountSchema;
  lastPost: Pick<PostSchema, "id" | "title" | "createdAt">;
}

export interface GetAritcleCirclesRespSchema {
  circles: GetAritcleCircleRespSchema[];
}

export interface GetWidgetBookmarkRespSchema {
  id: number;
  title: string;
  user: {
    id: number;
    username: string;
  };
}

export interface GetWidgetBookmarksRespSchema
  extends Array<GetWidgetBookmarkRespSchema> {}
