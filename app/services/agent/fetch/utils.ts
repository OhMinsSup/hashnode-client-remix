import { BaseError, ErrorType } from "../../error";
import type { QueryParams } from "./types";

export const getSearchParams = (
  url: URL | string,
  params?: URLSearchParams | string
) => {
  if (!params) {
    return url;
  }
  const textSearchParams =
    typeof params === "string"
      ? params.replace(/^\?/, "")
      : new URLSearchParams(params).toString();
  const searchParams = "?" + textSearchParams;
  const toStringUrl = typeof url === "string" ? url : url.toString();
  return toStringUrl.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
};

export function normalizeHeaders(
  headers: Headers | Record<string, unknown> | undefined
): Headers | undefined {
  if (typeof headers === "undefined") {
    return undefined;
  }

  const normalized: Headers = new Headers();

  for (const [header, value] of Object.entries(headers)) {
    normalized.set(header.toLowerCase(), value as unknown as string);
  }
  return normalized;
}

export function encodeMethodCallBody(
  headers: Headers | undefined,
  data?: unknown
): ArrayBuffer | undefined {
  if (typeof headers === "undefined") {
    return undefined;
  }

  const contentType = headers.get("content-type");
  if (!contentType || typeof data === "undefined") {
    return undefined;
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (contentType.startsWith("text/")) {
    return new TextEncoder().encode((data as string).toString());
  }

  if (contentType.startsWith("application/json")) {
    return new TextEncoder().encode(JSON.stringify(data));
  }

  return undefined;
}

export function normalizeResponseHeaders(
  headers: Headers
): Record<string, string> {
  // headers.entries() returns an iterator of key, value pairs
  // Object.fromEntries() turns this into an object
  const supportEntries =
    "entries" in headers && typeof headers.entries === "function";
  if (supportEntries) {
    // @ts-expect-error TS2339: Property 'entries' does not exist on type 'Headers'.
    return Object.fromEntries(headers.entries() as unknown);
  }

  const normalized: Record<string, string> = {};
  for (const [header, value] of Object.entries(headers)) {
    normalized[header.toLowerCase()] = value as unknown as string;
  }
  return normalized;
}

export async function httpResponseBodyParse(
  mimeType: string | null,
  res: Response
) {
  if (mimeType) {
    if (mimeType.includes("application/json")) {
      try {
        return await res.json();
      } catch (e) {
        throw new BaseError(
          ErrorType.ResponseError,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }

    if (mimeType.startsWith("text/")) {
      try {
        return await res.text();
      } catch (e) {
        throw new BaseError(
          ErrorType.ResponseError,
          `Failed to parse response body: ${String(e)}`
        );
      }
    }

    if (mimeType.startsWith("application/octet-stream")) {
      try {
        return await res.blob();
      } catch (error) {
        throw new BaseError(
          ErrorType.ResponseError,
          `Failed to parse response body: ${String(error)}`
        );
      }
    }
  }

  return res;
}

export function constructMethodCallUri(
  pathname: string,
  serviceUri: URL,
  params?: QueryParams
): string {
  const uri = new URL(serviceUri);
  uri.pathname = pathname;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null || typeof value !== "undefined") {
        if (Array.isArray(value)) {
          uri.searchParams.append(
            key,
            value.map((v) => encodeQueryParam("unknown", v)).join(",")
          );
        } else {
          const hasToString = Object.prototype.hasOwnProperty.call(
            value,
            "toString"
          );

          if (hasToString) {
            const data = value as unknown as { toString: () => string };
            uri.searchParams.append(
              key,
              encodeQueryParam("unknown", data.toString())
            );
          } else {
            uri.searchParams.append(key, encodeQueryParam("unknown", value));
          }
        }
      }
    }
  }

  return uri.toString();
}

export function encodeQueryParam(
  type:
    | "string"
    | "float"
    | "integer"
    | "boolean"
    | "datetime"
    | "array"
    | "unknown",
  value: unknown
): string {
  if (type === "string" || type === "unknown") {
    return String(value);
  }
  if (type === "float") {
    return String(Number(value));
  } else if (type === "integer") {
    return String(Number(value) | 0);
  } else if (type === "boolean") {
    return value ? "true" : "false";
  } else if (type === "datetime") {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  }
  throw new Error(`Unsupported query param type: ${type}`);
}
