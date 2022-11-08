import type { Nullable } from "~/api/schema/api";
import type { PostListQuery } from "~/api/schema/query";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ME: "users",
  },
  POSTS: {
    ROOT: "posts",
    TRENDING: "posts/trending/simple",
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
    TRENDING: (type: string) => ["getSimpleTrendingPostsApi", type],
    ID: (id?: Nullable<string | number>) => {
      const keys: any[] = ["getPostApi"];
      if (id) keys.push(id);
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
};

export const PAGE_ENDPOINTS = {
  ROOT: "/",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  CREATE: {
    STORY: "/create/story",
  },
  ITEMS: {
    ID: (id: number | string) => `/items/${id}`,
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
