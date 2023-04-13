import type { Nullable } from "~/api/schema/api";
import type { PostListQuery } from "~/api/schema/query";
import type { GetWidgetBookmarksApiSearchParams } from "~/api/widget/widget";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ME: "users",
    LOGOUT: "users/logout",
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
  },
  DRAFTS: {
    ROOT: "drafts",
    NEW: "drafts/new",
    SAVE_DATA: "drafts/save-data",
    ID: (id: string | number) => `drafts/${id}`,
  },
  WIDGET: {
    ARTICLE_CIRCLES: "widget/article-circles",
    BOOKMARKS: "widget/bookmarks",
  },
} as const;

export const QUERIES_KEY = {
  ME: ["getUserInfoApi"],
  FILE: {
    ROOT: ["getFileListApi"],
  },
  POSTS: {
    ROOT: (query?: PostListQuery) => {
      let keys: any[] = ["getPostsListApi"];
      if (query) keys = [...keys, query];
      return keys;
    },
    GET_TOP_POSTS: (duration: number) => ["getTopPostsApi", { duration }],
    ID: (id?: Nullable<string | number>) => {
      const keys: any[] = ["getPostApi"];
      if (id) keys.push(id);
      return keys;
    },
  },
  WIDGET: {
    ARTICLE_CIRCLES: (query?: GetWidgetBookmarksApiSearchParams) => {
      const keys: any[] = ["getAritcleCirclesApi"];
      if (!query) return keys;
      if (query.userId) {
        keys.push({ userId: query.userId });
      }
      return keys;
    },
  },
  TAGS: {
    ROOT: (keyword?: string, type?: string) => {
      let keys = ["getTagListApi"];

      if (keyword) {
        keys.push(keyword);
      }

      if (type) {
        keys.push(type);
      }

      return keys;
    },
  },
  DRAFTS: {
    ROOT: (keyword?: string) => {
      const keys: string[] = ["getDraftListApi"];
      if (keyword) keys.push(keyword);
      return keys;
    },
  },
};

export const MUTATIONS_KEY = {
  DRAFTS: {
    SAVE_DRAFTS: "postSaveDraftApi",
    NEW_DRAFTS: "postNewDraftApi",
    DELETE: (id: string | number) => ["deleteDraftApi", { id }],
  },
  POSTS: {},
  FILES: {
    UPLOAD: "postImageUploadApi",
  },
};

export const ASSET_URL = {
  DEFAULT_AVATAR: "/images/qDAyv6PK_.png",
};

export const PAGE_ENDPOINTS = {
  BOOKMARKS: {
    ROOT: "/bookmarks",
  },
  EXPLORE: {
    ROOT: "/explore",
    TAGS: "/explore/tags",
    POSTS: "/explore/posts",
  },
  ROOT: "/",
  FEATURED: "/featured",
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
  },
  DRAFT: {
    ROOT: "/draft",
  },
  ITEMS: {
    ID: (id: number | string) => `/items/${id}`,
  },
  SETTINGS: {
    ROOT: "/settings",
    ACCOUNT: "/settings/account",
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
  // 로그인 할 수 없음
  CANNOT_BE_LOGIN: 5000,
} as const;
