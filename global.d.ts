interface Window {
  ENV?: {
    API_BASE_URL: string;
  };
}

declare namespace FetchSchema {
  export interface SkillSchema {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  }

  export interface UserProfileSchema {
    id: number;
    userId: number;
    name: string;
    tagline?: string | null;
    avatarUrl?: string | null;
    location?: string | null;
    bio?: string | null;
    availableText?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  }

  export interface UserSocialSchema {
    github: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
    website: string | null;
  }

  export interface UserSchema {
    id: number;
    email: string;
    username: string;
    profile: Omit<
      UserProfileSchema,
      "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt"
    >;
    skills: Pick<SkillSchema, "id" | "name">[];
    socials: UserSocialSchema;
    createdAt: string;
  }

  export interface TagSchema {
    id: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number | null;
  }

  export interface PaginationQuery {
    limit?: number;
    cursor?: number;
  }

  export interface TagListQuery extends PaginationQuery {
    name?: string;
    type?: "popular" | "recent";
  }

  export interface PostListQuery extends PaginationQuery {
    keyword?: string;
    type?: "recent" | "featured" | "past" | "personalized";
    startDate?: string;
    endDate?: string;
  }

  export interface GetTopPostsQuery {
    duration: number;
  }

  export enum UPLOAD_TYPE {
    PROFILE = "PROFILE",
    IMAGE = "IMAGE",
    POST_THUMBNAIL = "POST_THUMBNAIL",
  }

  export type UploadType = keyof typeof UPLOAD_TYPE;

  export enum MEDIA_TYPE {
    IMAGE = "IMAGE",
  }

  export type MediaType = keyof typeof MEDIA_TYPE;

  export interface FileSchema {
    id: number;
    name: string;
    url: string;
    uploadType: UploadType;
    mediaType: MediaType;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  export interface PostCountSchema {
    postLike: number;
  }

  export interface PostSeoSchema {
    title: string | null;
    desc: string | null;
    image: string | null;
  }

  export interface PostSchema {
    id: number;
    title: string;
    subTitle: string | null;
    content: string;
    description: string;
    thumbnail: string | null;
    disabledComment: boolean;
    publishingDate: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: UserSchema;
    tags: Pick<TagSchema, "id" | "name">[];
    seo?: PostSeoSchema;
    count: PostCountSchema;
  }

  export interface DraftSchema {
    id: number;
    title?: string;
    json?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
}

declare namespace FetchRespSchema {
  export interface ListRespSchema<Item = Record<string, any>> {
    list: Item[];
    totalCount: number;
    pageInfo: {
      endCursor: number | null;
      hasNextPage: boolean;
    };
  }

  export interface AuthRespSchema {
    userId: number;
    accessToken: string;
  }

  export interface UserRespSchema extends FetchSchema.UserSchema {}

  export interface PostRespSchema {
    dataId: number;
  }

  export interface DraftRespSchema extends PostRespSchema {}

  export interface DraftDetailRespSchema extends FetchSchema.DraftSchema {}

  export interface TagWithPostCountSchema
    extends Omit<FetchSchema.TagSchema, "deletedAt"> {
    postsCount: number;
  }

  export interface UploadRespSchema
    extends Omit<
      FetchSchema.FileSchema,
      "createdAt" | "updatedAt" | "deletedAt"
    > {}

  export interface FileListRespSchema
    extends ListRespSchema<Omit<FetchSchema.FileSchema, "deletedAt">> {}

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

  export interface PostDetailRespSchema extends FetchSchema.PostSchema {
    count: FetchSchema.PostCountSchema;
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

  export interface DraftListRespSchema
    extends ListRespSchema<FetchSchema.DraftSchema> {}

  export interface GetAritcleCircleRespSchema {
    id: number;
    username: string;
    email: string;
    profile: Pick<
      FetchSchema.UserProfileSchema,
      "name" | "bio" | "avatarUrl" | "tagline"
    >;
    count: FetchSchema.PostCountSchema;
    lastPost: Pick<FetchSchema.PostSchema, "id" | "title" | "createdAt">;
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
}
