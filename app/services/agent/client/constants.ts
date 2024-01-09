export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    SIGNIN: "/auth/signin",
  },
  FILES: {
    ROOT: "/files",
  },
  NOTIFICATIONS: {
    ROOT: "/notifications",
    COUNT: "/notifications/count",
    READ_ALL: "/notifications/read-all",
    ID_READ: (id: string) => `/notifications/${id}/read`,
  },
  TAGS: {
    ROOT: "/tags",
    ID: (id: string) => `/tags/${id}`,
    FOLLOW: "/tags/follow",
    SLUG: (slug: string) => `/tags/${slug}/slug`,
  },
  POSTS: {
    ROOT: "posts",
    GET_TOP_POSTS: "posts/get-top-posts",
    GET_DRAFT_POSTS: "posts/get-draft-posts",
    GET_DELETED_POSTS: "posts/get-deleted-posts",
    GET_LIKES: "posts/get-likes",
    ID: (id: string | number) => `posts/${id}`,
  },
  USERS: {
    ROOT: "users",
    ME: "users/me",
    LOGOUT: "users/logout",
    MY_POSTS: "users/my-posts",
    USER_FOLLOW: "users/follow",
    ID: (username: string) => `users/${username}`,
    HISTORTIES: (username: string) => `users/${username}/histories`,
    USERNAME_POSTS: (username: string) => `users/${username}/posts`,
    TRENDING_USERS: "users/treanding",
    OWNER_POSTS: {
      ID: (id: string | number) => `users/owner-posts/${id}`,
    },
  },
} as const;

export const CLOUDFLARE = {
  uri: new URL("https://api.cloudflare.com"),
  CF_DIRECT_UPLOAD: (cfId: string) =>
    `/client/v4/accounts/${cfId}/images/v2/direct_upload`,
};
