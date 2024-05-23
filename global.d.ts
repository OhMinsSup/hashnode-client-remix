interface Window {
  ENV?: {
    API_BASE_URL: string;
  };
}

declare namespace SerializeSchema {
  type BlogMemberRole = 'OWNER' | 'EDITOR';

  type BlogMemberVisibility = 'PUBLIC' | 'PRIVATE';

  type BlogLayoutType = 'MAGAZINE' | 'STACKED' | 'GRID';

  // Auth
  export type Hashnodeonboard = {
    username: string;
    job: string;
    image: string;
    description: string;
  };

  export type SerializeBlogSeo = {
    title: string;
    description: string;
    image: string;
  };

  export type SerializeBlogAppearance = {
    layoutType: BlogLayoutType;
    logo: string | undefined;
    logoDark: string | undefined;
    favicon: string | undefined;
    headerColor: string | undefined;
    displayReadTime: boolean;
    displayPostViews: boolean;
    subscribeNewsletter: boolean;
  };

  export type SerializeBlogSocial = {
    github: string | undefined;
    twitter: string | undefined;
    instagram: string | undefined;
    mastodon: string | undefined;
    youtube: string | undefined;
    linkedin: string | undefined;
    dailydev: string | undefined;
  };

  export type SerializeBlogMember = {
    role: BlogMemberRole;
    visibility: BlogMemberVisibility;
    User: SerializeSimepleUser;
    createdAt: string;
  };

  export type SerializeBlog = {
    id: string;
    type: BlogType;
    title: string;
    about: string;
    createdAt: string;
    BlogMembers: SerializeBlogMember[];
    BlogSeo: SerializeBlogSeo;
    BlogAppearance: SerializeBlogAppearance;
    BlogSocial: SerializeBlogSocial;
  };

  export type SerializeUserProfile = {
    username: string;
    nickname: string | undefined;
    image: string | undefined;
    tagline: string | undefined;
    location: string | undefined;
    bio: string | undefined;
    availableText: string | undefined;
  };

  export type SerializeUserSocial = {
    github: string | undefined;
    twitter: string | undefined;
    facebook: string | undefined;
    instagram: string | undefined;
    website: string | undefined;
    stackoverflow: string | undefined;
    youtube: string | undefined;
    linkedin: string | undefined;
  };

  export type SerializeUserEmail = {
    id: string;
    hashnodeWeekly: boolean;
    activityNotifications: boolean;
    generalAnnouncements: boolean;
    monthlyBlogStats: boolean;
    referralNotifications: boolean;
    newFollowersWeekly: boolean;
  };

  export type SerializeUser = {
    id: string;
    email: string;
    createdAt: string;
    UserProfile: SerializeUserProfile;
    UserSocial: SerializeUserSocial;
    UserTags: SerializeTag<false>[];
    UserEmail: SerializeUserEmail;
    Blog: SerializeBlog;
  };

  export type SerializeSimepleUser = {
    UserProfile: Pick<SerializeUserProfile, 'username' | 'image'>;
  } & Pick<SerializeUser, 'id' | 'email'>;

  export type SerializeTagStats = {
    follow: number;
    inUse: number;
    score: number;
  };

  export type SerializeTagCount = {
    PostTags: number;
    UserTags: number;
  };

  export type SerializeTag<IncludeStats = true> = {
    id: string;
    name: string;
    description: string | undefined;
    image: string | undefined;
    TagStats: IncludeStats extends true ? SerializeTagStats : undefined;
    count: SerializeTagCount;
  };

  export type SerializePostStats = {
    likes: number;
    clicks: number;
    comments: number;
    score: number;
  };

  export type SerializePostSeo = {
    title: string;
    description: string;
    image: string;
  };

  export type SerializePostCount = {
    PostTags: number;
  };

  export type SerializePostConfig = {
    disabledComment: boolean;
    hiddenArticle: boolean;
    hasTableOfContents: boolean;
    isDraft: boolean;
    isMarkdown: boolean;
    publishedAt: string | undefined;
  };

  export type SerializePostCoAuthor = SerializeSimepleUser;

  export type SerializePost<IncludeStats = true> = {
    id: string;
    urlSlug: string;
    title: string;
    subTitle: string | undefined;
    content: string | undefined;
    meta: Record<string, unknown> | undefined;
    image: string | undefined;
    PostConfig: SerializePostConfig;
    PostTags: SerializeTag<false>[];
    PostCoAuthor: SerializePostCoAuthor[];
    PostSeo: Partial<SerializePostSeo>;
    PostStats: IncludeStats extends true ? SerializePostStats : undefined;
    User: SerializeSimepleUser;
    count: SerializePostCount;
    createdAt: string;
    updatedAt: string;
  };

  type UploadType = 'IMAGE' | 'POST_THUMBNAIL' | 'SEO';

  type MediaType = 'IMAGE' | 'VIDEO' | 'AUDIO';

  export type SerializeFile = {
    id: string;
    cfId: string;
    publicUrl: string;
    filename: string;
    mimeType: string;
    uploadType: UploadType;
    mediaType: MediaType;
  };

  export type SerializeGetLeftSidePostCount = {
    submitted: number;
    draft: number;
    published: number;
  };
}

declare namespace FetchQuerySchema {}

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
      currentPage: number;
      nextPage: number | null;
      hasNextPage: boolean;
    };
  };

  export type File = {
    id: string;
    publicUrl: string;
  };

  export type Auth = {
    userId: string;
    authToken;
  };

  export type Id<T = string> = {
    dataId: T;
  };
}

declare namespace CloudflareSchema {
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

  export type CfUpload = CfCommonResp<{
    id: string;
    metadata: Record<string, string>;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
    draft: boolean;
  }>;

  export type CfDirectUpload = CfCommonResp<{
    id: string;
    uploadURL: string;
  }>;
}

declare namespace RemixDataFlow {
  export type Status = 'success' | 'error';

  export type Message = string | null;

  export type Response<D = unknown, E = unknown> = {
    status: Status;
    result: D;
    message: Message;
    errors: E;
  };
}

declare namespace UntilsTypes {
  type DeepObjectKeyOf<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
      ? `${K}.${DeepObjectKeyOf<T[K]>}`
      : K;
  }[keyof T];
}
