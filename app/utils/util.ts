import { isNull, isNullOrUndefined, isObject, isUndefined } from "./assertion";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

export function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

export function getError<T>(obj: T, path: string, defaultValue?: unknown): any {
  if (!path || !isObject(obj)) {
    return defaultValue;
  }

  const result = compact(path.split(/[,[\].]+?/)).reduce(
    (result, key) =>
      // eslint-disable-next-line @typescript-eslint/ban-types
      isNullOrUndefined(result) ? result : result[key as keyof {}],
    obj
  );

  return isUndefined(result) || result === obj
    ? isUndefined(obj[path as keyof T])
      ? defaultValue
      : obj[path as keyof T]
    : result;
}

export function optimizeAnimation(callback: () => void) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}

export function parseUrlParams<T = Record<string, any>>(url: string) {
  const params = new URLSearchParams(new URL(url).searchParams);
  const result = {} as any;
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result as T;
}

export const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000000000);
};

export const firstLetterToUpperCase = (str?: string) => {
  if (!str) {
    return null;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const noopPromiseResponse = (data: any) => {
  return Promise.resolve({
    result: {
      message: undefined,
      result: data,
      resultCode: 0,
      error: undefined,
    },
  });
};

export const valueToBoolean = (value: any) => {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (isNull(value) || isUndefined(value)) {
    return false;
  }
  return value;
};
