import type { Nullable } from "~/api/schema/api";
import { Icons } from "~/components/shared/Icons";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ROOT: "users",
    ME: "users/me",
    LOGOUT: "users/logout",
    MY_POSTS: "users/my-posts",
    USER_FOLLOW: "users/follow",
    ID: (userId: string) => `users/${userId}`,
    HISTORTIES: (userId: string) => `users/${userId}/histories`,
    USERNAME_POSTS: (username: string) => `users/${username}/posts`,
    TRENDING_USERS: "users/treanding",
    OWNER_POSTS: {
      ID: (id: string | number) => `users/owner-posts/${id}`,
    },
  },
  POSTS: {
    ROOT: "posts",
    GET_TOP_POSTS: "posts/get-top-posts",
    GET_DRAFT_POSTS: "posts/get-draft-posts",
    GET_DELETED_POSTS: "posts/get-deleted-posts",
    GET_LIKES: "posts/get-likes",
    ID: (id: string | number) => `posts/${id}`,
  },
  FILES: {
    ROOT: "files",
  },
  NOTIFICATIONS: {
    ROOT: "notifications",
    GET_COUNT: "notifications/count",
    READ_ALL: "notifications/read-all",
    READ: (id: string | number) => `notifications/${id}/read`,
  },
  TAGS: {
    ROOT: "tags",
    TAG: (tag: string) => `tags/${tag}`,
    TAG_FOLLOW: "tags/follow",
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
      query?: FetchQuerySchema.PostList
    ): [string, FetchQuerySchema.PostList?] => {
      const keys: [string, FetchQuerySchema.PostList?] = ["getMyPostListApi"];
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
  WRITE_TEAM_LOGO: "/images/write_team_logo.png",
  DEFAULT_TAG: "/images/default_tag.png",
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
    TAG_HOT: (tag: string) => `/n/${tag}/hot`,
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

export const NAVIGATION_ITEMS = [
  {
    id: 1,
    title: "My Feed",
    href: PAGE_ENDPOINTS.ROOT,
    icon: Icons.MyFeed,
    applyActiveLinks: [
      PAGE_ENDPOINTS.FEATURED,
      PAGE_ENDPOINTS.FOLLOWING,
    ] as string[],
    position: ["left", "top"] as string[],
  },
  {
    id: 2,
    title: "Explore",
    href: PAGE_ENDPOINTS.EXPLORE.ROOT,
    icon: Icons.Explore,
    applyActiveLinks: [
      PAGE_ENDPOINTS.EXPLORE.TAGS,
      PAGE_ENDPOINTS.EXPLORE.BLOGS,
    ] as string[],
    position: ["left", "top"] as string[],
  },
  {
    id: 3,
    title: "Drafts",
    href: PAGE_ENDPOINTS.DRAFT.ROOT,
    icon: Icons.MyDraft,
    applyActiveLinks: [] as string[],
    position: ["left"] as string[],
  },
  {
    id: 4,
    title: "Bookmarks",
    href: PAGE_ENDPOINTS.BOOKMARKS.ROOT,
    icon: Icons.MyBookmark,
    applyActiveLinks: [] as string[],
    position: ["left", "top"] as string[],
  },
  {
    id: 5,
    title: "My Items",
    href: PAGE_ENDPOINTS.USERS.ROOT,
    icon: Icons.UserProfile,
    applyActiveLinks: [] as string[],
    position: ["left", "top"] as string[],
  },
  {
    id: 6,
    title: "Search",
    href: PAGE_ENDPOINTS.ROOT,
    icon: Icons.Search,
    applyActiveLinks: [] as string[],
    position: ["left"] as string[],
  },
] as const;

export const NAVIGATION_USER_MENU_ITEMS = [
  {
    id: 1,
    title: "Profile",
    href: PAGE_ENDPOINTS.SETTINGS.ROOT,
    icon: Icons.V2.SettingUser,
  },
  {
    id: 2,
    title: "Email Notifications",
    href: PAGE_ENDPOINTS.SETTINGS.EMAILS,
    icon: Icons.V2.SettingEmail,
  },
  {
    id: 3,
    title: "Account",
    href: PAGE_ENDPOINTS.SETTINGS.ACCOUNT,
    icon: Icons.V2.SettingAccount,
  },
];

export const NAVIGATION_EXPLORE_ITEMS = [
  {
    id: 1,
    name: "Treanding",
    href: PAGE_ENDPOINTS.EXPLORE.ROOT,
  },
  {
    id: 2,
    name: "Tags",
    href: PAGE_ENDPOINTS.EXPLORE.TAGS,
  },
  {
    id: 3,
    name: "Blogs",
    href: PAGE_ENDPOINTS.EXPLORE.BLOGS,
  },
  {
    id: 4,
    name: "Tags You Follow",
    href: "/explore/tags-following",
  },
  {
    id: 5,
    name: "Blogs You Follow",
    href: "/explore/blogs-following",
  },
] as const;

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
