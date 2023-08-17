import cookies from "cookie";
import { ofetch } from "ofetch";
import { isBrowser } from "~/libs/browser-utils";
import { isArray, isEmpty, isString } from "~/utils/assertion";
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { FetchOptions } from "ofetch";
import type { ApiRoutes, Body, ApiOptions, AppAPI } from "./fetch.type";

export class FetchService {
  static baseURL = isBrowser
    ? (function () {
        if (window.ENV && window.ENV.API_BASE_URL) {
          return window.ENV?.API_BASE_URL;
        }
        return "http://localhost:8080";
      })()
    : (function () {
        return "http://localhost:8080";
      })();

  static prefix = "/api";

  static defineApis = API_ENDPOINTS;

  static apiFetch = ofetch.create({
    baseURL: this.baseURL,
    retry: false,
    ignoreResponseError: false,
    onRequest: ({ options }) => {
      if (!isBrowser) {
        let _access_token: string | null = null;
        let header = options.headers;

        if (header) {
          if (header instanceof Headers) {
            const cookieValue =
              header.get("cookie") || header.get("set-cookie") || null;
            if (cookieValue) {
              const { access_token } = cookies.parse(cookieValue);
              if (access_token) _access_token = access_token;
            }
          } else if (isArray(header)) {
            header.forEach((item) => {
              const [key, value] = item;
              if (key === "cookie" || key === "set-cookie") {
                const { access_token } = cookies.parse(value);
                if (access_token) _access_token = access_token;
              }
            });
          } else if (typeof header === "object") {
            const cookieValue = header.cookie || header["set-cookie"] || null;
            if (cookieValue) {
              const { access_token } = cookies.parse(cookieValue);
              if (access_token) _access_token = access_token;
            }
          }

          if (_access_token) {
            //
          }
        } else {
          options.credentials = "include";
        }
      }
    },
    onRequestError: (ctx) => {},
    onResponseError: (ctx) => {},
  });

  static getSearchParams = (
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

  static makeURL = (request: ApiRoutes, options?: ApiOptions) => {
    let _prefix = this.prefix.endsWith("/")
      ? this.prefix.slice(0, -1)
      : this.prefix;

    const { v1 } = options?.customOptions?.flag ?? {};
    if (v1) {
      _prefix = `${_prefix}/v1/`;
    } else {
      _prefix = `${_prefix}/v1/`;
    }

    const _baseURL = _prefix
      ? new URL(_prefix, this.baseURL)
      : this.baseURL
      ? new URL(this.baseURL)
      : undefined;

    if (!_baseURL) {
      throw new Error("baseURL is undefined");
    }

    if (request instanceof URL) {
      const url = new URL(request.toString(), _baseURL.toString());
      return {
        url: url,
        pathname: url.pathname,
      };
    }

    if (isString(request)) {
      const _fullURL = `${_baseURL.toString()}${request}`;
      const url = new URL(_fullURL);
      return {
        url: url,
        pathname: url.pathname,
      };
    }

    const _clone = new URL(request.url);
    const _fullURL = `${_baseURL.toString()}${_clone.pathname}`;
    const url = new URL(_fullURL);
    return {
      url: url,
      pathname: url.pathname,
    };
  };

  static makeBody = (body?: Body) => {
    if (body instanceof FormData) {
      return body;
    }

    if (!body) {
      return undefined;
    }

    if (isEmpty(body)) {
      return undefined;
    }

    return body;
  };

  static async $fetch(request: ApiRoutes, options?: ApiOptions) {
    const { pathname } = this.makeURL(request, options);
    const _response = await this.apiFetch.native(
      pathname,
      options?.requestInit
    );
    return _response;
  }

  static async get<FetchData extends Record<string, unknown>>(
    request: ApiRoutes,
    options?: ApiOptions
  ) {
    const { pathname } = this.makeURL(request, options);
    const { oFetchOptions = undefined } = options || {};
    const defaultFetchOptions: FetchOptions<"json"> = {
      ...(oFetchOptions || {}),
      method: "GET",
    };
    const _response = await this.apiFetch<AppAPI<FetchData>>(
      pathname,
      defaultFetchOptions
    );
    return _response;
  }

  static async post<FetchData extends Record<string, unknown>>(
    request: ApiRoutes,
    input?: Body,
    options?: ApiOptions
  ) {
    const { pathname } = this.makeURL(request, options);
    const body = this.makeBody(input);
    const { oFetchOptions = undefined } = options || {};
    const defaultFetchOptions: FetchOptions<"json"> = {
      ...(oFetchOptions || {}),
      method: "POST",
      body,
    };
    const _response = await this.apiFetch<AppAPI<FetchData>>(
      pathname,
      defaultFetchOptions
    );
    return _response;
  }

  static async delete<FetchData extends Record<string, unknown>>(
    request: ApiRoutes,
    options?: ApiOptions
  ) {
    const { pathname } = this.makeURL(request, options);
    const { oFetchOptions = undefined } = options || {};
    const defaultFetchOptions: FetchOptions<"json"> = {
      ...(oFetchOptions || {}),
      method: "DELETE",
    };
    const _response = await this.apiFetch<AppAPI<FetchData>>(
      pathname,
      defaultFetchOptions
    );
    return _response;
  }

  static async put<FetchData extends Record<string, unknown>>(
    request: ApiRoutes,
    input?: Body,
    options?: ApiOptions
  ) {
    const { pathname } = this.makeURL(request, options);
    const body = this.makeBody(input);
    const { oFetchOptions = undefined } = options || {};
    const defaultFetchOptions: FetchOptions<"json"> = {
      ...(oFetchOptions || {}),
      method: "PUT",
      body,
    };
    const _response = await this.apiFetch<AppAPI<FetchData>>(
      pathname,
      defaultFetchOptions
    );
    return _response;
  }
}
