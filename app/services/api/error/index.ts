import type {
  FetchContext,
  IFetchError,
  ResponseMapType,
} from "../fetch/types";

export class FetchError<T = unknown> extends Error implements IFetchError<T> {
  constructor(message: string, opts?: { cause: unknown }) {
    // https://v8.dev/features/error-cause
    super(message, opts);

    this.name = "FetchError";

    // Polyfill cause for other runtimes
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }

  public static isFetchError<T = unknown>(
    value: unknown
  ): value is IFetchError<T> {
    return value instanceof FetchError;
  }
}

// Augment `FetchError` type to include `IFetchError` properties
export type FetchErrorType<T = unknown> = IFetchError<T>;

export function createFetchError<
  T = unknown,
  R extends ResponseMapType = "json",
>(ctx: FetchContext<T, R>): IFetchError<T> {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- `ctx.error` can be `null`
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- `ctx.request` can be `null`
  const method = (ctx.request as Request).method || ctx.options.method || "GET";
  const url = (ctx.request as Request).url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;

  const statusStr = ctx.response
    ? `${ctx.response.status.toString()} ${ctx.response.statusText}`
    : "<no response>";

  const message = `${requestStr}: ${statusStr}${
    errorMessage ? ` ${errorMessage}` : ""
  }`;

  const fetchError = new FetchError<T>(
    message,
    ctx.error ? { cause: ctx.error } : undefined
  );

  for (const key of ["request", "options", "response"] as const) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      },
    });
  }

  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"],
  ] as const) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      },
    });
  }

  return fetchError;
}
