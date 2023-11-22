import { ZodError } from "zod";
import { FetchError } from "~/services/fetch/fetch.error";
import { ASSET_URL, STATUS_CODE } from "~/constants/constant";
import { isArray } from "~/utils/assertion";
import { redirect } from "@remix-run/cloudflare";
import { FetchService } from "~/services/fetch/fetch.api";

import type { Env } from "./env.server";
import type { ErrorAPI } from "~/services/fetch/fetch.type";
import type { OptionalToast } from "../validate/toast.validate";

export type ResponseState<Data = any> = {
  statusCode: number;
  errors: Record<string, string> | null;
  data: Data;
};

export type ResponseJSON<Data = any> = {
  ok: boolean;
  code: number;
  data: Data | null;
  error: Record<string, string> | null;
};

export class ServerService {
  constructor(private readonly env: Env) {}

  getHashnodeonboard() {
    return {
      image: ASSET_URL.DEFAULT_AVATAR,
      username: "Guillermo Rauch",
      job: "CEO, Vercel",
      description: `It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.`,
    } as FetchSchema.Hashnodeonboard;
  }

  async redirectWithToast(
    url: string,
    toast: OptionalToast,
    createToastHeaders: (optionalToast: OptionalToast) => Promise<Headers>,
    init?: ResponseInit
  ) {
    return redirect(url, {
      ...init,
      headers: this.combineHeaders(
        init?.headers,
        await createToastHeaders(toast)
      ),
    });
  }

  /**
   * @version 2023-08-17
   * @description Combine multiple header objects into one (uses append so headers are not overridden)
   * @param {Array<ResponseInit["headers"] | null>} headers
   */
  combineHeaders(...headers: Array<ResponseInit["headers"] | null>) {
    const combined = new Headers();
    for (const header of headers) {
      if (!header) continue;
      for (const [key, value] of new Headers(header).entries()) {
        combined.append(key, value);
      }
    }
    return combined;
  }

  /**
   * @version 2023-08-17
   * @description Combine multiple response init objects into one (uses combineHeaders)
   * @param {ResponseInit} responseInits
   */
  combineResponseInits(...responseInits: Array<ResponseInit | undefined>) {
    let combined: ResponseInit = {};
    for (const responseInit of responseInits) {
      combined = {
        ...responseInit,
        headers: this.combineHeaders(combined.headers, responseInit?.headers),
      };
    }
    return combined;
  }

  /**
   * @version 2023-08-17
   * @description response 값의 json 읽기
   * @param {Response} response
   */
  async toJSON<T>(response: Response) {
    return await FetchService.toJson<T>(response);
  }

  /**
   * @version 2023-08-17
   * @description 쿠키 읽기
   * @param {Request} request
   */
  readHeaderCookie(request: Request) {
    const cookie =
      request.headers.get("Cookie") ||
      request.headers.get("Set-Cookie") ||
      null;
    return cookie;
  }

  /**
   * @version 2023-08-17
   * @description 로그인 쿠키 생성
   * @param {string} cookieValue
   */
  getAuthHeaders(cookieValue: string) {
    const headers = new Headers();
    headers.append("Set-Cookie", cookieValue);
    return headers;
  }

  /**
   * @version 2023-08-17
   * @description 로그아웃 쿠키 생성
   */
  getClearAuthHeaders() {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return headers;
  }

  /**
   * @version 2023-08-17
   * @description FormData 읽기
   * @param {Request} request
   */
  readFormData(request: Request) {
    return request.formData();
  }

  /**
   * @version 2023-08-17
   * @description Body 읽기
   * @param {unknown} error
   */
  readBodyError(error: unknown) {
    if (error instanceof TypeError) {
      return {
        statusCode: STATUS_CODE.BAD_REQUEST as number,
        errors: {
          error: "잘못된 요청입니다.",
        },
      };
    }
    return null;
  }

  /**
   * @version 2023-08-17
   * @description error validation
   * @param {unknown} error
   */
  readValidateError<Data = any>(error: unknown): ResponseJSON<Data> | null {
    if (error instanceof ZodError) {
      const obj: Record<string, string> = {};
      error.issues.reduce((acc, cur) => {
        const key = cur.path.at(0);
        if (!key) return acc;
        acc[key] = cur.message;
        return acc;
      }, obj);
      return {
        ok: false,
        code: STATUS_CODE.BAD_REQUEST as number,
        data: null,
        error: obj,
      };
    }
    return null;
  }

  /**
   * @version 2023-08-17
   * @description error fetch
   * @param {unknown} error
   */
  async readFetchError<Data = any>(
    error: unknown
  ): Promise<ResponseJSON<ErrorAPI<Data>> | null> {
    if (error instanceof FetchError) {
      const $response = error.response;
      const data = await $response.json<ErrorAPI>();
      const checkStatusCode = $response.status >= 400 && $response.status < 500;

      if (checkStatusCode) {
        const errorKey = data.error;
        const errors = data.message;
        return {
          ok: false,
          code: $response.status,
          error: {
            [errorKey]: isArray(errors) ? errors[0] : errors,
          },
          data,
        };
      } else {
        return {
          ok: false,
          code: $response.status,
          error: {
            common: "An unknown error occurred.",
          },
          data: null,
        };
      }
    }
    return null;
  }

  /**
   * @version 2023-08-17
   * @description 요청
   * @param {Request} request
   */
  readValidateMethod(request: Request, method: string, redirectUrl: any) {
    if (request.method !== method) {
      throw redirect(redirectUrl, {
        status: STATUS_CODE.METHOD_NOT_ALLOED,
      });
    }
  }

  /**
   * @version 2023-08-17
   * @description 요청
   */
  getResponse<Data = any>(data: Data) {
    return {
      statusCode: STATUS_CODE.OK,
      errors: null,
      data,
    } as ResponseState;
  }
}
