import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { SearchParams } from "~/.server/utils/request.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function parseUrlParams(url: string) {
  const _url = new URL(url);
  const searchParams = _url.searchParams;
  return Object.fromEntries(searchParams.entries());
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
  if (typeof value === "undefined" || value === null) {
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

export const createFormData = <T extends FieldValues>(
  data: T,
  stringifyAll = true
): FormData => {
  const formData = new FormData();
  if (!data) {
    return formData;
  }
  Object.entries(data).map(([key, value]) => {
    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
      return;
    }
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else {
      if (stringifyAll) {
        formData.append(key, JSON.stringify(value));
      } else {
        if (typeof value === "string") {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, JSON.stringify(value));
        }
      }
    }
  });

  return formData;
};

export const isGet = (request: Pick<Request, "method">) =>
  request.method === "GET" || request.method === "get";

const tryParseJSON = (jsonString: string) => {
  try {
    const json = JSON.parse(jsonString);

    return json;
  } catch (e) {
    return jsonString;
  }
};

export const generateFormData = (
  formData: FormData | URLSearchParams,
  preserveStringified = false
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputObject: Record<any, any> = {};

  for (const [key, value] of formData.entries()) {
    const data = preserveStringified ? value : tryParseJSON(value.toString());
    const keyParts = key.split(".");
    let currentObject = outputObject;

    for (let i = 0; i < keyParts.length - 1; i++) {
      const keyPart = keyParts[i];
      if (!currentObject[keyPart]) {
        currentObject[keyPart] = /^\d+$/.test(keyParts[i + 1]) ? [] : {};
      }
      currentObject = currentObject[keyPart];
    }

    const lastKeyPart = keyParts[keyParts.length - 1];
    const lastKeyPartIsArray = /\[\d*\]$|\[\]$/.test(lastKeyPart);

    if (lastKeyPartIsArray) {
      const key = lastKeyPart.replace(/\[\d*\]$|\[\]$/, "");
      if (!currentObject[key]) {
        currentObject[key] = [];
      }

      currentObject[key].push(data);
    }

    if (!lastKeyPartIsArray) {
      if (/^\d+$/.test(lastKeyPart)) {
        currentObject.push(data);
      } else {
        currentObject[lastKeyPart] = data;
      }
    }
  }

  // Return the output object.
  return outputObject;
};

export const validateFormData = async <T extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  resolver: Resolver<T>
) => {
  const dataToValidate =
    data instanceof FormData ? Object.fromEntries(data) : data;
  const { errors, values } = await resolver(
    dataToValidate,
    {},
    { shouldUseNativeValidation: false, fields: {} }
  );

  if (Object.keys(errors).length > 0) {
    return { errors: errors as FieldErrors<T>, data: undefined };
  }

  return { errors: undefined, data: values as T };
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const parseFormData = async <T extends any>(
  request: Request | FormData,
  preserveStringified = false
): Promise<T> => {
  const formData =
    request instanceof Request ? await request.formData() : request;
  return generateFormData(formData, preserveStringified);
};

export const getFormDataFromSearchParams = (
  request: Pick<Request, "url">,
  preserveStringified = false
) => {
  const searchParams = new URL(request.url).searchParams;
  return generateFormData(searchParams, preserveStringified);
};

export const getValidatedFormData = async <T extends FieldValues>(
  request: Request,
  resolver: Resolver<T>,
  preserveStringified = false
) => {
  const data = isGet(request)
    ? getFormDataFromSearchParams(request, preserveStringified)
    : await parseFormData<T>(request, preserveStringified);

  const validatedOutput = await validateFormData<T>(data, resolver);
  return { ...validatedOutput, receivedValues: data };
};

export const getQueryPath = (basePath: string, searchParams?: SearchParams) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    return `${basePath}?${params.toString()}`;
  }
  return basePath;
};

export const getInfinityQueryPath = (
  basePath: string,
  searchParams?: SearchParams,
  pageNo?: number
) => {
  if (searchParams) {
    const params = new URLSearchParams(searchParams);
    if (pageNo) {
      params.set("pageNo", String(pageNo));
    }
    return `${basePath}?${params.toString()}`;
  }

  if (pageNo) {
    const params = new URLSearchParams();
    params.set("pageNo", String(pageNo));
    return `${basePath}?${params.toString()}`;
  }

  return basePath;
};
