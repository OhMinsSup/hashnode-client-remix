import { destr } from "destr";
import { withBase, withQuery } from "ufo";

import type {
  FetchContext,
  FetchOptions,
  FetchRequest,
  FetchResponse,
  MappedResponseType,
  ResponseMapType,
} from "./types";
import { createFetchError } from "../error";
import {
  detectResponseType,
  isJSONSerializable,
  mergeFetchOptions,
} from "./utils";

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);

function isPayloadMethod(method = "GET"): boolean {
  return payloadMethods.has(method.toUpperCase());
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const retryStatusCodes = new Set([
  408, // Request Timeout
  409, // Conflict
  425, // Too Early
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, //  Gateway Timeout
]);

// https://developer.mozilla.org/en-US/docs/Web/API/Response/body
const nullBodyResponses = new Set([101, 204, 205, 304]);

export async function fetchHandler<
  T = unknown,
  R extends ResponseMapType = "json",
>(
  _request: FetchRequest,
  _options?: FetchOptions<R>
): Promise<FetchResponse<MappedResponseType<R, T>>> {
  async function onError(
    context: FetchContext<T, R>
  ): Promise<FetchResponse<MappedResponseType<R>>> {
    // Is Abort
    // If it is an active abort, it will not retry automatically.
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names
    const isAbort =
      (context.error &&
        context.error.name === "AbortError" &&
        !context.options.timeout) ||
      false;
    // Retry
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }

      const responseCode = context.response?.status ?? 500;
      if (
        retries > 0 &&
        (Array.isArray(context.options.retryStatusCodes)
          ? context.options.retryStatusCodes.includes(responseCode)
          : retryStatusCodes.has(responseCode))
      ) {
        const retryDelay = context.options.retryDelay ?? 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => {
            setTimeout(resolve, retryDelay);
          });
        }
        // Timeout
        return fetchHandler(context.request, {
          ...context.options,
          retry: retries - 1,
        });
      }
    }

    // Throw normalized error
    const error = createFetchError<T, R>(context);

    // Only available on V8 based runtimes (https://v8.dev/docs/stack-trace-api)
    if (
      "captureStackTrace" in Error &&
      Error.captureStackTrace &&
      typeof Error.captureStackTrace === "function"
    ) {
      Error.captureStackTrace(error, fetchHandler);
    }
    throw error;
  }

  const context: FetchContext<T, R> = {
    request: _request,
    options: mergeFetchOptions(_options, {}, Headers),
    response: undefined,
    error: undefined,
  };

  context.options.method = context.options.method?.toUpperCase();

  if (context.options.onRequest) {
    await context.options.onRequest(context);
  }

  if (typeof context.request === "string") {
    if (context.options.baseURL) {
      context.request = withBase(context.request, context.options.baseURL);
    }

    if (context.options.query ?? context.options.params) {
      const params = (context.options.params ?? {}) as Record<string, string>;
      const query = (context.options.query ?? {}) as Record<string, string>;
      const values = { ...params, ...query };
      context.request = withQuery(context.request, values);
    }
  }

  if (context.options.body && isPayloadMethod(context.options.method)) {
    if (isJSONSerializable(context.options.body)) {
      context.options.body =
        typeof context.options.body === "string"
          ? context.options.body
          : JSON.stringify(context.options.body);

      context.options.headers = new Headers(context.options.headers ?? {});
      if (!context.options.headers.has("content-type")) {
        context.options.headers.set("content-type", "application/json");
      }
      if (!context.options.headers.has("accept")) {
        context.options.headers.set("accept", "application/json");
      }
    }
  }

  let abortTimeout: ReturnType<typeof setTimeout> | undefined;

  // TODO: Can we merge signals?
  if (!context.options.signal && context.options.timeout) {
    const controller = new AbortController();
    abortTimeout = setTimeout(() => {
      controller.abort();
    }, context.options.timeout);
    context.options.signal = controller.signal;
  }

  try {
    context.response = await fetch(
      context.request,
      context.options as RequestInit
    );
  } catch (error) {
    context.error = error as Error;
    if (context.options.onRequestError) {
      await context.options.onRequestError(
        context as FetchContext<T, R> & {
          error: Error;
        }
      );
    }
    return await onError(context);
  } finally {
    if (abortTimeout) {
      clearTimeout(abortTimeout);
    }
  }

  const hasBody =
    context.response.body &&
    !nullBodyResponses.has(context.response.status) &&
    context.options.method !== "HEAD";

  if (hasBody) {
    const responseType =
      (context.options.parseResponse ? "json" : context.options.responseType) ??
      detectResponseType(context.response.headers.get("content-type") ?? "");

    switch (responseType) {
      case "json": {
        const data = await context.response.text();

        const parseFunction = context.options.parseResponse || destr;
        context.response._data = parseFunction(data) as T;
        break;
      }
      default: {
        context.response._data = (await context.response[responseType]()) as T;
      }
    }
  }

  if (context.options.onResponse) {
    await context.options.onResponse(
      context as FetchContext<T, R> & {
        response: FetchResponse<R>;
      }
    );
  }

  if (
    !context.options.ignoreResponseError &&
    context.response.status >= 400 &&
    context.response.status < 600
  ) {
    if (context.options.onResponseError) {
      await context.options.onResponseError(
        context as FetchContext<T, R> & {
          response: FetchResponse<R>;
        }
      );
    }
    return await onError(context);
  }

  return context.response as FetchResponse<MappedResponseType<R, T>>;
}
