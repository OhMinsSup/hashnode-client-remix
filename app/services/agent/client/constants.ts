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
    FOLLOW: (id: string) => `/tags/${id}/follow`,
    SLUG: (slug: string) => `/tags/${slug}/slug`,
  },
  POSTS: {},
  USERS: {},
} as const;

export const CLOUDFLARE = {
  uri: new URL("https://api.cloudflare.com"),
  CF_DIRECT_UPLOAD: (cfId: string) =>
    `/client/v4/accounts/${cfId}/images/v2/direct_upload`,
};
