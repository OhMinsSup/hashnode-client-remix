import { ResponseError, BaseError, ErrorType } from "~/services/error";
import {
  encodeMethodCallBody,
  httpResponseBodyParse,
  normalizeHeaders,
  normalizeResponseHeaders,
} from "./utils";

// types
import type { FetchHandlerOptions, FetchHandlerResponse } from "./types";

const GET_TIMEOUT = 30 * 1000; // 30 seconds
const POST_TIMEOUT = 60 * 1000; // 60 seconds

export async function defaultFetchHandler(
  opts: FetchHandlerOptions
): Promise<FetchHandlerResponse> {
  const headers = normalizeHeaders(opts.headers);

  const controller = new AbortController();
  const to = setTimeout(
    () => {
      controller.abort();
    },
    opts.method === "GET" ? GET_TIMEOUT : POST_TIMEOUT
  );

  const reqInit: RequestInit = {
    method: opts.method,
    headers,
    body: encodeMethodCallBody(headers, opts.reqBody),
    signal: controller.signal,
  };

  const request = new Request(opts.uri, reqInit);

  try {
    const res = await fetch(request);
    if (!res.ok) {
      throw new ResponseError(res, request, opts);
    }

    const contentType = res.headers.get("content-type");
    return {
      status: res.status,
      headers: normalizeResponseHeaders(res.headers),
      body: httpResponseBodyParse(contentType, res),
    };
  } catch (e) {
    if (e instanceof ResponseError) {
      throw e;
    }

    throw new BaseError(
      ErrorType.ResponseError,
      `Unexpected error while fetching ${opts.method} ${opts.uri}`
    );
  } finally {
    clearTimeout(to);
  }
}
