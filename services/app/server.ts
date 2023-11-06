import { ZodError } from "zod";
import { FetchError } from "services/fetch/fetch.error";
import { ASSET_URL, PAGE_ENDPOINTS, STATUS_CODE } from "~/constants/constant";
import { isArray } from "~/utils/assertion";
import { createCookie, redirect } from "@remix-run/cloudflare";
import { FetchService } from "services/fetch/fetch.client";

import type { Cookie } from "@remix-run/cloudflare";
import type { Env } from "../env";
import type { ErrorAPI } from "services/fetch/fetch.type";

export type ErrorState<Data = any> = {
  statusCode: number;
  errors: Record<string, string> | null;
  data: Data;
};

export class ServerService {
  signupValidateName = "hashnode.signup-validate";
  signupValidateStorage: Cookie;

  constructor(private readonly env: Env) {
    this.signupValidateStorage = createCookie(this.signupValidateName, {
      httpOnly: true,
      sameSite: "lax",
      path: PAGE_ENDPOINTS.AUTH.SIGNIN,
      expires: new Date(Date.now() + 3600000), // 1 hour
      secrets: [env.COOKIE_SESSION_SECRET],
    });
  }

  getHashnodeonboard() {
    return {
      image: ASSET_URL.DEFAULT_AVATAR,
      username: "Guillermo Rauch",
      job: "CEO, Vercel",
      description: `It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.`,
    } as FetchSchema.Hashnodeonboard;
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
  readValidateError(error: unknown): ErrorState | null {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.issues.reduce((acc, cur) => {
        const key = cur.path.at(0);
        if (!key) return acc;
        acc[key] = cur.message;
        return acc;
      }, errors);
      return {
        statusCode: STATUS_CODE.BAD_REQUEST as number,
        errors,
        data: null,
      };
    }
    return null;
  }

  /**
   * @version 2023-08-17
   * @description error fetch
   * @param {unknown} error
   */
  async readFetchError(error: unknown): Promise<ErrorState | null> {
    if (error instanceof FetchError) {
      const $response = error.response;
      const data = await $response.json<ErrorAPI>();
      const checkStatusCode = [
        STATUS_CODE.BAD_REQUEST,
        STATUS_CODE.NOT_FOUND,
      ] as number[];

      if (checkStatusCode.includes($response.status)) {
        const errorKey = data.error;
        const errors = data.message;
        return {
          statusCode: $response.status,
          errors: {
            [errorKey]: isArray(errors) ? errors[0] : errors,
          },
          data,
        };
      } else {
        return {
          statusCode: $response.status,
          errors: {
            error: "알 수 없는 에러가 발생했습니다.",
          },
          data,
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
   * @description 회원가입이 안된 유저인지 확인
   * @param {Request} request
   */
  async getSignupValidate(request: Request) {
    const value = await this.signupValidateStorage.parse(
      request.headers.get("Cookie")
    );
    return value as string;
  }

  /**
   * @version 2023-08-17
   * @description 회원가입이 안된 유저인지 확인
   * @param {string} value
   */
  async setSignupValidate(value: string) {
    const session = await this.signupValidateStorage.serialize(value);
    return session;
  }
}
