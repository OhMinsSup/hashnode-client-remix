interface Window {
  ENV?: {
    API_BASE_URL: string;
  };
}

declare namespace SerializeSchema {
  // Auth
  export type Hashnodeonboard = {
    username: string;
    job: string;
    image: string;
    description: string;
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
  };

  export type SerializeUser = {
    id: string;
    email: string;
    createdAt: string;
    UserProfile: SerializeUserProfile;
    UserSocial: SerializeUserSocial;
    UserTags: SerializeTag<false>[];
  };

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
    publishedAt: string | Date | undefined;
  };

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
    PostSeo: Partial<SerializePostSeo>;
    PostStats: IncludeStats extends true ? SerializePostStats : undefined;
    count: SerializePostCount;
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

  export type Auth = {
    userId: string;
    authToken;
  };

  export type Id<T = string> = {
    dataId: T;
  };
}

declare namespace UntilsTypes {
  type DeepObjectKeyOf<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
      ? `${K}.${DeepObjectKeyOf<T[K]>}`
      : K;
  }[keyof T];
}
