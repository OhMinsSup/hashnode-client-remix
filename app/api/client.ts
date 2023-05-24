// utils
import cookies from "cookie";
import { isBrowser } from "~/libs/browser-utils";
import { isEmpty, isNull, isString, isUndefined } from "~/utils/assertion";

// types
import type { Nullable } from "./schema/api";

export class HTTPError extends Error {
  public response: Response;
  public request: Request;
  public options: any;

  constructor(response: Response, request: Request, options: any) {
    const code =
      response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    super(`Request failed with ${reason}`);

    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }
}

export type ApiRoutes = URL | RequestInfo;

export type CustomOptions = {
  isAuthticated?: boolean;
};

export type BaseApiOptions = {
  custom?: CustomOptions;
  init?: RequestInit;
  request?: Request;
};

export type BaseResponse<Data = any> = {
  resultCode: number;
  message: Nullable<string | string[]> | undefined;
  error: Nullable<string> | undefined;
  result: Data;
};

export class ApiService {
  static baseUrl = !isBrowser
    ? "http://localhost:8080/api/v1"
    : window.ENV?.API_BASE_URL ?? "http://localhost:8080/api/v1";

  static setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  static middlewareSetAuthticated = (options?: BaseApiOptions) => {
    const _options = Object.assign({}, options);
    if (
      (options?.custom && isUndefined(options.custom.isAuthticated)) ||
      isNull(options?.custom?.isAuthticated)
    ) {
      _options.custom = Object.assign({}, _options.custom, {
        isAuthticated: true,
      });
      return _options;
    }
    return _options;
  };

  static middlewareForAuth = (options?: BaseApiOptions) => {
    const isAuthticated = options?.custom?.isAuthticated ?? false;
    if (!isAuthticated) return options;
    const _options = {
      custom: options?.custom,
      init: options?.init,
      rqeuest: options?.request,
    };

    // 클라이언트
    if (isBrowser) {
      _options.init = Object.assign({}, _options.init, {
        credentials: "include",
      });
      return _options;
    }

    // 서버
    let _access_token: string | null = null;
    const _headers = options?.request?.headers ?? new Headers();

    if (_headers) {
      const cookie =
        _headers.get("cookie") || _headers.get("set-cookie") || null;
      if (cookie) {
        const { access_token } = cookies.parse(cookie);
        if (access_token) _access_token = access_token;
      }
    }

    if (!_access_token) return options;

    const HEADERS = [
      "cookie",
      "Cookie",
      "set-cookie",
      "Set-Cookie",
      "content-type",
      "Content-Type",
    ];
    const headers = new Headers();
    for (const [key, value] of _headers) {
      if (HEADERS.includes(key)) headers.set(key, value);
    }
    // TODO: Cloudflare
    // cloudflare workerd에서는 credentials를 지원하지 않음
    // 하지만 cloudflare workerd에는 구현체 정보가 있음?
    // credentials: "include",
    _options.init = Object.assign({}, _options.init, {
      headers,
    });

    return _options;
  };

  static middlewareForUrl = (pathname: ApiRoutes) => {
    const baseURL = new URL(ApiService.baseUrl);
    const basePathname = baseURL.pathname;
    const concatPathname = basePathname + "/" + pathname.toString();
    return new URL(concatPathname, ApiService.baseUrl);
  };

  static middlewareForSearchParams = (
    url: ApiRoutes | string,
    params?: URLSearchParams | string
  ) => {
    if (!params) {
      return url;
    }
    const textSearchParams = isString(params)
      ? params.replace(/^\?/, "")
      : new URLSearchParams(params).toString();
    const searchParams = "?" + textSearchParams;
    const toStringUrl = isString(url) ? url : url.toString();
    return toStringUrl.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
  };

  static headerJSON = (options?: BaseApiOptions["init"]) => {
    const headers = new Headers();
    if (options?.headers && options.headers instanceof Headers) {
      for (const [key, value] of options.headers.entries()) {
        headers.set(key, value);
      }
    }
    headers.set("content-type", "application/json");
    return headers;
  };

  static headerFormData = (options?: BaseApiOptions["init"]) => {
    const headers = new Headers();
    if (options?.headers && options.headers instanceof Headers) {
      for (const [key, value] of options.headers.entries()) {
        headers.set(key, value);
      }
    }
    headers.set("content-type", "multipart/form-data");
    return headers;
  };

  static async get(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const requset = new Request(input, {
      ...options,
      method: "GET",
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, options);
    }
    return response;
  }

  static async post(
    pathname: ApiRoutes,
    body?: any,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const requset = new Request(input, {
      ...options,
      method: "POST",
      body: body && !isEmpty(body) ? JSON.stringify(body) : undefined,
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, options);
    }
    return response;
  }

  static async delete(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const requset = new Request(input, {
      ...options,
      method: "DELETE",
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, options);
    }
    return response;
  }

  static async put(
    pathname: ApiRoutes,
    body?: any,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const requset = new Request(input, {
      ...options,
      method: "PUT",
      body: body && !isEmpty(body) ? JSON.stringify(body) : undefined,
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, options);
    }
    return response;
  }

  static async patch(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const requset = new Request(input, {
      ...options,
      method: "PATCH",
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, options);
    }
    return response;
  }

  static async getJson<R = Record<string, any>>(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const headers = this.headerJSON(options);
    const response = await this.get(pathname, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }

  static async postJson<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const headers = this.headerJSON(options);
    const response = await this.post(pathname, body, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }

  static async postFormData<R = Record<string, any>>(
    pathname: ApiRoutes,
    formData: FormData | HTMLFormElement,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const body =
      formData instanceof FormData ? formData : new FormData(formData);
    const headers = this.headerFormData(options);
    const response = await this.post(pathname, body, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }

  static async deleteJson<R = Record<string, any>>(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const headers = this.headerJSON(options);
    const response = await this.delete(pathname, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }

  static async putJson<R = Record<string, any>, Body = Record<string, any>>(
    pathname: ApiRoutes,
    body: Body,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const headers = this.headerJSON(options);
    const response = await this.put(pathname, body, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }

  static async putFormData<R = Record<string, any>>(
    pathname: ApiRoutes,
    formData: FormData | HTMLFormElement,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const body =
      formData instanceof FormData ? formData : new FormData(formData);
    const headers = this.headerFormData(options);
    const response = await this.put(pathname, body, {
      ...options,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    return {
      json: data as BaseResponse<R>,
      response,
    };
  }
}
