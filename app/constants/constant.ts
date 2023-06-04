import type { GetMyPostListApiSearchParams } from "~/api/posts/my-posts.server";
import type { Nullable } from "~/api/schema/api";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ME: "users",
    LOGOUT: "users/logout",
    MY_POSTS: "users/my-posts",
    USERNAME: (username: string) => `users/${username}`,
    USERNAME_POSTS: (username: string) => `users/${username}/posts`,
    TRENDING_USERS: "users/treanding",
  },
  POSTS: {
    ROOT: "posts",
    GET_TOP_POSTS: "posts/get-top-posts",
    GET_LIKES: "posts/get-likes",
    ID: (id: string | number) => `posts/${id}`,
  },
  FILES: {
    ROOT: "files",
    UPLOAD_URL: "files/upload_url",
    UPLOAD: "files/upload",
  },
  TAGS: {
    ROOT: "tags",
    TAG: (tag: string) => `tags/${tag}`,
    TAG_FOLLOW: (tag: string) => `tags/${tag}/follow`,
    TAG_TRENDING: "tags/trending",
  },
  DRAFT: {
    ROOT: "draft",
    ID: (id: string | number) => `draft/${id}`,
  },
  WIDGET: {
    ARTICLE_CIRCLES: "widget/article-circles",
    BOOKMARKS: "widget/bookmarks",
  },
} as const;

export const QUERIES_KEY = {
  FILE: {
    ROOT: ["getFileListApi"],
  },
  POSTS: {
    GET_MY_POSTS: (
      query?: GetMyPostListApiSearchParams
    ): [string, GetMyPostListApiSearchParams?] => {
      const keys: [string, GetMyPostListApiSearchParams?] = [
        "getMyPostListApi",
      ];
      if (query) keys.push(query);
      return keys;
    },
    GET_TOP_POSTS: (duration: number): [string, { duration: number }] => [
      "getTopPostsApi",
      { duration },
    ],
    ID: (id?: Nullable<string | number>): [string, number?] => {
      const keys: [string, number?] = ["getPostApi"];
      if (id) keys.push(id);
      return keys;
    },
  },
};

export const MUTATIONS_KEY = {
  FILES: {
    UPLOAD: "postImageUploadApi",
  },
};

export const REMIX_ACTIONS_KEY = {
  LOGOUT: "/action/logout",
  TAG_FOLLOW: "/action/tag/follow",
};

export const ASSET_URL = {
  DEFAULT_AVATAR: "/images/default_profile.png",
  LOGO: "/images/logo.png",
  PLACEHOLDER: "/images/placeholder.png",
  SEO_IMAGE: "/images/seo_image.png",
};

export const PAGE_ENDPOINTS = {
  BOOKMARKS: {
    ROOT: "/bookmarks",
  },
  EXPLORE: {
    ROOT: "/explore",
    TAGS: "/explore/tags",
    BLOGS: "/explore/blogs",
  },
  ROOT: "/",
  FEATURED: "/featured",
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
  },
  DRAFT: {
    ROOT: "/draft",
    ID: (id: string | number) => `/draft/${id}`,
  },
  ITEMS: {
    ID: (id: number | string) => `/items/${id}`,
  },
  N: {
    TAG: (tag: string) => `/n/${tag}`,
    TAG_HOT: (tag: string) => `/n/${tag}/hot`,
  },
  SETTINGS: {
    ROOT: "/settings",
    ACCOUNT: "/settings/account",
  },
  USERS: {
    ID: (username: string) => `/blog/@${username}`,
  },
} as const;

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
} as const;

export const RESULT_CODE = {
  // 성공
  OK: 0,
  // 잘못된 패스워드
  INCORRECT_PASSWORD: 4004,
  // 존재하지 않음
  NOT_EXIST: 2001,
  // 삭제됨
  DELETED: 2002,
  // 이미 존재함
  ALREADY_EXIST: 2003,
  // 유효하지 않음
  INVALID: 2004,
  // 만료된 토큰
  TOKEN_EXPIRED: 4001,
  // 유효하지 않은 토큰
  INVALID_TOKEN: 4002,
  // 인증 토큰이 없음
  NO_AUTH_TOKEN: 4003,
  // 로그인 할 수 없음
  CANNOT_BE_LOGIN: 5000,
} as const;
