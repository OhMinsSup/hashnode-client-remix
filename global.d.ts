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

  export type SettingEmailItems = {
    id: number;
    label: string;
    description: string;
    checked: boolean;
  };

  export type AuthRespSchema = {
    userId: number;
    authToken: string;
  };

  // User

  export type UserImage = {
    id: string;
    cfId: string;
    avatarUrl: string;
    filename: string;
    mimeType: string;
    fk_user_id: string | null;
  };

  export type UserProfile = {
    id: string;
    username: string;
    nickname: string | null;
    tagline: string | null;
    location: string | null;
    bio: string | null;
    availableText: string | null;
    createdAt: string;
    updatedAt: string;
    fk_user_id: string | null;
  };

  export type UserSocial = {
    id: string;
    github: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
    website: string | null;
    createdAt: string;
    updatedAt: string;
    fk_user_id: string | null;
  };

  export type User = {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    lastActiveAt: string | null;
    lastActiveIp: string | null;
    lastSignInAt: string | null;
    lastSignInIp: string | null;
  };

  // Tags

  export type Tag = {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
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

declare namespace SerializeSchema {
  export type SerializeUserProfile = Omit<
    FetchSchema.UserProfile,
    "id" | "createdAt" | "updatedAt" | "fk_user_id"
  >;

  export type SerializeUserImage = Omit<
    FetchSchema.UserImage,
    "id" | "cfId" | "fk_user_id" | "filename" | "mimeType"
  >;

  export type SerializeUserSocial = Omit<
    FetchSchema.UserSocial,
    "id" | "createdAt" | "updatedAt" | "fk_user_id"
  >;

  export type SerializeUserTag = Omit<
    FetchSchema.Tag,
    "description" | "image" | "createdAt" | "updatedAt"
  >;

  export type SerializeUser = {
    userProfile: SerializeUserProfile;
    userImage: SerializeUserImage;
    userSocial: SerializeUserSocial;
    userTags: SerializeUserTag[];
    isFollow?: boolean;
    followerCount?: number;
    followingCount?: number;
  } & Pick<FetchSchema.User, "id" | "email" | "createdAt">;

  export type SerializeTagCount = {
    postCount: number;
    isFollowing: boolean;
    followCount: number;
  } & Pick<FetchSchema.Tag, "id" | "name">;

  export type SerializeTagCountList = SerializeTagCount[];

  export type SerializeDataID<ID = string> = {
    dataId: ID;
  };

  export type SerializeDataIDTypeWithCount<ID = string> = {
    count: number;
  } & SerializeDataIDWithType<ID>;

  export type SerializeDataIDWithType<ID = string> = {
    type: "create" | "delete" | "none" | "follow" | "unfollow";
  } & SerializeDataID<ID>;

  export type SerializeHistory = {
    id: string;
    text: string;
    itemType: string;
    isActive: boolean;
    user: {
      id: string;
      username: string;
    };
    dateAddedAt: string;
    createdAt: string;
  };

  export type SerializePostImage = {
    id: string;
    publicUrl: string;
  };

  export type SerializePostSeo = {
    title: string;
    description: string;
    file: SerializePostImage;
  };

  export type SerializePostTag = {
    id: number;
    name: string;
  };

  export type SerializePostTags = SerializePostTag[];

  export type SerializePost = {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    disabledComment: boolean;
    publishingDate: string;
    createdAt: string;
    updatedAt: string;
    user: SerializeUser;
    postImage: SerializePostImage;
    postTags: SerializePostTags;
    postSeo: SerializePostSeo;
    likeCount: number;
    readCount: number;
  };

  export type SerializeFile = FetchSchema.File & {
    id: string;
    user: {
      userProfile: Pick<SerializeUserProfile, "username">;
    };
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

  export type UserList = Pagination & {
    name?: string;
    type?: "default" | "trending";
    category?: "week" | "all" | "month" | "year";
  };

  export type GetTopPost = {
    duration: number;
  };
}

declare namespace FetchRespSchema {
  export type Error<Result = unknown> = {
    resultCode: number;
    message: string;
    error: string;
    result: Result;
  };

  export type Success<Result = unknown> = {
    resultCode: number;
    message: string | null;
    result: Result;
    error: null;
  };

  export type ListResp<Item = Record<string, unknown>> = {
    list: Item[];
    totalCount: number;
    pageInfo: {
      endCursor: number | null;
      hasNextPage: boolean;
    };
  };

  export type DataIDResp = SerializeSchema.SerializeDataID;

  export type UserResponse = SerializeSchema.SerializeUser;

  export type UserHistoryResp = SerializeSchema.SerializeHistory;

  export type UserListResp = ListResp<UserResponse>;

  export type PostResp = DataIDResp;

  export type FileListResp = ListResp<SerializeSchema.SerializeFile>;

  export type TagListResp = ListResp<SerializeSchema.SerializeTagCount>;

  export type TagDetailResp = SerializeSchema.SerializeTagCount;

  export type TagFollowResp = SerializeSchema.SerializeDataIDTypeWithCount;

  export type UserFollowResp = SerializeSchema.SerializeDataIDWithType;

  export type PostDetailResp = SerializeSchema.SerializePost;

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

  export type CfCommonResp<Result = unknown> = {
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
    id: string;
    publicUrl: string;
  };
}
