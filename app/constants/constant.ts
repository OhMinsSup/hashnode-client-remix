export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/signup",
    SIGNIN: "auth/signin",
  },
  USERS: {
    ME: "users",
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
};

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
};

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
};

export const WEB_APP = "@@APP";

export const STORAGE_KEY = {
  TOKEN_KEY: `${WEB_APP}/authToken`,
};
