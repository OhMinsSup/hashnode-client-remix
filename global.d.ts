interface Window {
  ENV?: {
    API_BASE_URL: string;
  };
}

declare namespace FetchSchema {
  // Auth
  export type Hashnodeonboard = {
    username: string;
    job: string;
    image: string;
    description: string;
  };

  export type AuthRespSchema = {
    userId: number;
    accessToken: string;
  };

  // User

  export type Skill = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  };

  export type UserProfile = {
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
  };

  export type UserSocial = {
    github: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
    website: string | null;
  };

  export type User = {
    id: number;
    email: string;
    username: string;
    profile: Omit<
      UserProfile,
      "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt"
    >;
    skills: Pick<Skill, "id" | "name">[];
    socials: UserSocial;
    createdAt: string;
  };

  // Tags

  export type Tag = {
    id: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number | null;
  };

  // Posts

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

  export type File = {
    id: number;
    filename: string;
    publicUrl: string;
    uploadType: UploadType;
    mediaType: MediaType;
    createdAt: string;
    updatedAt: string;
    user?: Pick<User, "id" | "username">;
  };

  export type PostCount = {
    postLike: number;
  };

  export type PostSeo = {
    title: string | null;
    desc: string | null;
    image: string | null;
  };

  export type Post = {
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
    user: User;
    tags: Pick<Tag, "id" | "name">[];
    seo?: PostSeo;
    count: PostCount;
  };
}

declare namespace FetchQuerySchema {
  export type Pagination = {
    limit?: number;
    cursor?: number;
  };

  export type TagList = Pagination & {
    name?: string;
    type?: "recent" | "popular" | "new" | "trending";
    category?: "week" | "all" | "month" | "year";
  };

  export type PostList = Pagination & {
    keyword?: string;
    type?: "recent" | "featured" | "past" | "personalized";
    startDate?: string;
    endDate?: string;
    tag?: string;
  };

  export type GetTopPost = {
    duration: number;
  };
}

declare namespace FetchRespSchema {
  export type ListResp<Item = Record<string, any>> = {
    list: Item[];
    totalCount: number;
    pageInfo: {
      endCursor: number | null;
      hasNextPage: boolean;
    };
  };

  export type DataIDResp = {
    dataId: number;
  };

  export type UserResponse = FetchSchema.User;

  export type PostResp = DataIDResp;

  export type TagWithPostCountResp = {
    postsCount: number;
  } & Omit<FetchSchema.Tag, "deletedAt">;

  export type FileListResp = ListResp<FetchSchema.File>;

  export type TagListResp = ListResp<TagWithPostCountResp>;

  export interface TagDetailResp {
    id: number;
    name: string;
    postCount: number;
    followCount: number;
    isFollowing: boolean;
  }

  export type TagFollowResp = {
    dataId: number;
    count: number;
  };

  export type PostDetailResp = FetchSchema.Post & {
    count: FetchSchema.PostCount;
  };

  export type PostLikeResp = PostDetailResp & {
    cursorId: number;
  };

  export type PostListResp = ListResp<PostDetailResp>;

  export type PostLikeListResp = ListResp<PostLikeResp>;

  export type ExploreBlogsListResp = Array<{
    id: number;
    email: string;
    username: string;
    avatarUrl: string | null;
    posts: Array<Pick<PostDetailResp, "id" | "title"> & { createdAt: number }>;
  }>;

  export interface GetTopPostsResp {
    posts: PostDetailResp[];
  }

  export interface GetAritcleCircleResp {
    id: number;
    username: string;
    email: string;
    profile: Pick<
      FetchSchema.UserProfile,
      "name" | "bio" | "avatarUrl" | "tagline"
    >;
    count: FetchSchema.PostCount;
    lastPost: Pick<FetchSchema.Post, "id" | "title" | "createdAt">;
  }

  export interface GetAritcleCirclesRespSchema {
    circles: GetAritcleCircleResp[];
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

  /// Cloudflare file upload

  export type CfCommonResp<Result = any> = {
    result: Result;
    success: boolean;
    errors: Array<{
      code: number;
      message: string;
    }>;
    messages: Array<{
      code: number;
      message: string;
    }>;
  };

  export type CfUploadResp = CfCommonResp<{
    id: string;
    metadata: Record<string, string>;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
    draft: boolean;
  }>;

  export type CfDirectUploadResp = CfCommonResp<{
    id: string;
    uploadURL: string;
  }>;

  export type FileResp = {
    id: number;
    publicUrl: string;
  };
}
