import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { isNull, isUndefined } from "./assertion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function parseUrlParams<T = Record<string, unknown>>(url: string) {
  const params = new URLSearchParams(new URL(url).searchParams);
  const result = {} as Record<string, unknown>;
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

export const valueToBoolean = (value: string | boolean | undefined | null) => {
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

// 영어식 단위로 숫자를 표현하는데 1000 -> 1K, 1000000 -> 1M, 1000000000 -> 1B, 1000000000000 -> 1T
export const numberToEnglishUnit = (num?: number | null) => {
  if (!num) {
    return 0;
  }

  if (num < 1000) {
    return num;
  }
  if (num < 1000000) {
    return `${Math.floor(num / 1000)}K`;
  }
  if (num < 1000000000) {
    return `${Math.floor(num / 1000000)}M`;
  }
  if (num < 1000000000000) {
    return `${Math.floor(num / 1000000000)}B`;
  }
  return `${Math.floor(num / 1000000000000)}T`;
};

export function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

/**
 * @returns domain URL (without a ending slash, like: https://kentcdodds.com)
 */
export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >,
>(
  leafMetaFn: MetaFunction<Loader, ParentsLoaders>
): MetaFunction<Loader, ParentsLoaders> => {
  return (arg) => {
    const leafMeta = leafMetaFn(arg);
    return arg.matches.reduceRight((acc, match) => {
      for (const parentMeta of match.meta) {
        const index = acc.findIndex(
          (meta) =>
            ("name" in meta &&
              "name" in parentMeta &&
              meta.name === parentMeta.name) ||
            ("property" in meta &&
              "property" in parentMeta &&
              meta.property === parentMeta.property) ||
            ("title" in meta && "title" in parentMeta)
        );
        if (index == -1) {
          // Parent meta not found in acc, so add it
          acc.push(parentMeta);
        }
      }
      return acc;
    }, leafMeta);
  };
};
