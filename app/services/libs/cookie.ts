interface CookieOptions {
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
