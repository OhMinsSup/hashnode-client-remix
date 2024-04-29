export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ROOT: "users",
  },
  POSTS: {
    ROOT: "posts",
    ID: (id: string) => `posts/${id}`,
    BY_OWNER: (id: string) => `posts/by-owner/${id}`,
  },
  DRAFTS: {
    ROOT: "drafts",
    SYNC: "drafts/sync",
    SUBMITTED: "drafts/submitted",
  },
} as const;

export const ASSET_URL = {
  DEFAULT_AVATAR: "/images/default_profile.png",
  LOGO: "/images/logo.png",
  PLACEHOLDER: "/images/placeholder.png",
  SEO_IMAGE: "/images/seo_image.png",
  WRITE_TEAM_LOGO: "/images/write_team_logo.png",
  DEFAULT_TAG: "/images/default_tag.png",
  SHAP: "/images/shap.png",
};

export const PAGE_ENDPOINTS = {
  BOOKMARKS: {
    ROOT: "/bookmarks",
  },
  NOTIFICATIONS: {
    ROOT: "/notifications",
  },
  EXPLORE: {
    ROOT: "/explore",
    TAGS: "/explore/tags",
    BLOGS: "/explore/blogs",
  },
  SEARCH: {
    ROOT: "/search",
  },
  ROOT: "/",
  FEATURED: "/featured",
  FOLLOWING: "/following",
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
    TAG_RECENT: (tag: string) => `/n/${tag}/recent`,
    TAG_RSS: (tag: string) => `/n/${tag}/rss.xml`,
  },
  SETTINGS: {
    ROOT: "/settings",
    EMAILS: "/settings/emails",
    ACCOUNT: "/settings/account",
  },
  USERS: {
    ROOT: "/users",
    ID: (id: string) => `/@${id}`,
    FOLLOWING: (id: string) => `/@${id}/following`,
  },
  WRITE: {
    ROOT: "/write",
    ID: (id: string | number) => `/write/${id}`,
  },
  POSTS: {
    ID: (id: string | number) => `/posts/${id}`,
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
  // 알수없는 에러
  UNKNOWN_ERROR: 9999,
} as const;
