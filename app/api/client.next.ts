import { isBrowser } from "~/libs/browser-utils";
import cookies from "cookie";
import type { Nullable } from "./schema/api";
import type { LoaderArgs, ActionArgs } from "@remix-run/cloudflare";

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
  loaderArgs?: LoaderArgs;
  actionArgs?: ActionArgs;
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

  static middlewareForAuth = (options?: BaseApiOptions) => {
    const isAuthticated = options?.custom?.isAuthticated ?? false;
    if (!isAuthticated) {
      return options;
    }

    const _options = {
      ...options,
    };

    // 클라이언트
    if (isBrowser) {
      _options.init = Object.assign({}, _options?.init, {
        credentials: "include",
      });
    } else {
      // 서버
      let _token: string | null = null;
      if (options?.loaderArgs) {
        const { request } = options.loaderArgs;
        const cookie = request.headers.get("Cookie") ?? null;
        if (cookie) {
          const { access_token } = cookies.parse(cookie);
          if (access_token) _token = access_token;
        }
      } else if (options?.actionArgs) {
        const { request } = options.actionArgs;
        const cookie = request.headers.get("Cookie") ?? null;
        if (cookie) {
          const { access_token } = cookies.parse(cookie);
          if (access_token) _token = access_token;
        }
      }

      if (!_token) {
        return options;
      }

      const header = new Headers();
      _options.init = Object.assign({}, _options?.init, {
        headers: header,
        credentials: "include",
      });
    }
    return _options;
  };

  static middlewareForUrl = (pathname: ApiRoutes) => {
    const baseURL = new URL(ApiService.baseUrl);
    const basePathname = baseURL.pathname;
    const concatPathname = basePathname + "/" + pathname.toString();
    return new URL(concatPathname, ApiService.baseUrl);
  };

  static async get(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const _opts = Object.assign({}, options, {
      method: "GET",
    });
    const requset = new Request(input, _opts);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, _opts);
    }
    return response;
  }

  static async post(
    pathname: ApiRoutes,
    body: any,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const _opts = Object.assign({}, options, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const requset = new Request(input, _opts);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, _opts);
    }
    return response;
  }

  static async delete(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const _opts = Object.assign({}, options, {
      method: "DELETE",
    });
    const requset = new Request(input, _opts);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, _opts);
    }
    return response;
  }

  static async put(
    pathname: ApiRoutes,
    body: any,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const _opts = Object.assign({}, options, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    const requset = new Request(input, _opts);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, _opts);
    }
    return response;
  }

  static async patch(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const input = this.middlewareForUrl(pathname);
    const _opts = Object.assign({}, options, {
      method: "PATCH",
    });
    const requset = new Request(input, _opts);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new HTTPError(response, requset, _opts);
    }
    return response;
  }

  static async getJson<R = Record<string, any>>(
    pathname: ApiRoutes,
    options?: BaseApiOptions["init"] | undefined
  ) {
    const response = await this.get(pathname, options);
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
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await this.post(pathname, body, Object.assign({}, options, {
      headers,
    }));
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const data = await response.json();
    console.log('data', data);
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
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    const response = await this.post(pathname, body, Object.assign({}, options ?? {}, {
      headers,
    }));
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
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await this.delete(pathname, Object.assign({}, options, {
      headers,
    }));
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
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const _opts = Object.assign({}, options ?? {}, Object.assign({}, options, {
      headers,
    })) as BaseApiOptions["init"];
    const response = await this.put(pathname, body, _opts);
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
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    const response = await this.put(pathname, body, Object.assign({}, options ?? {}, {
      headers,
    }));
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
