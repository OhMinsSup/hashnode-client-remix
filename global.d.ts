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
      endCursor: string | null;
      hasNextPage: boolean;
    };
  };

  export type Auth = {
    userId: string;
    authToken;
  };
}

declare namespace UntilsTypes {
  type DeepObjectKeyOf<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown>
      ? `${K}.${DeepObjectKeyOf<T[K]>}`
      : K;
  }[keyof T];
}
