export interface CookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  samesite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  let cookieString = `${name}=${value}; path=/`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.samesite) {
    cookieString += `; samesite=${options.samesite}`;
  }

  document.cookie = cookieString;
};

export const getCookie = (name: string) => {
  const cookieObj = Object.fromEntries(
    document.cookie.split(';').map((cookie) => cookie.split('=')),
  );

  return cookieObj[name];
};

export const removeCookie = (name: string, options: CookieOptions = {}) => {
  let cookieString = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  document.cookie = cookieString;
};
