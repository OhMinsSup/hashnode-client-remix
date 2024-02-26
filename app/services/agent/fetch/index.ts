import { ResponseError } from "../../error";
import {
  encodeMethodCallBody,
  httpResponseBodyParse,
  normalizeHeaders,
  normalizeResponseHeaders,
} from "./utils";
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
    const response = await fetch(request);
    if (!response.ok) {
      throw new ResponseError(response, request, opts);
    }

    const contentType = response.headers.get("content-type");
    return {
      status: response.status,
      headers: normalizeResponseHeaders(response.headers),
      body: await httpResponseBodyParse(contentType, response),
    };
  } finally {
    clearTimeout(to);
  }
}
