import cookies from "cookie";
import omit from "lodash-es/omit";
import { ZodError } from "zod";
import { redirect } from "@remix-run/cloudflare";

import { signinSchema } from "~/api/auth/validation/signin";
import { signupSchema } from "~/api/auth/validation/signup";

// import { signinApi } from "~/api/auth/signin.server";
import { logoutApi } from "~/api/user/logout.server";
// import { signupApi } from "~/api/auth/signup.server";
import { getMeApi } from "~/api/user/me.server";

// import { HTTPError } from "~/api/error";

import { signinApi as $signinApi } from "services/fetch/auth/signin-api.server";
import { signupApi as $signupApi } from "services/fetch/auth/signup-api.server";
// import { FetchService } from "services/fetch/fetch.client";
import { FetchError } from "services/fetch/fetch.error";

import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import { isArray } from "~/utils/assertion";

// types
import type { Env } from "../env";
import type { UserRespSchema } from "~/api/schema/resp";
import type { ErrorAPI } from "services/fetch/fetch.type";

export class AuthApiService {
  constructor(private readonly env: Env) {}

  /**
   * @version 2023-08-17
   * @description 로그인 API
   * @param {Request} request
   */
  async signin(request: Request) {
    const formData = await this.readFormData(request);
    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const parse = await signinSchema.parseAsync(input);
    console.log(parse);
    return $signinApi(parse);
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 API
   * @param {Request} request
   */
  async signup(request: Request) {
    const formData = await this.readFormData(request);
    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    const parse = await signupSchema.parseAsync(input);
    return $signupApi(omit(parse, ["confirmPassword"]));
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 후 리다이렉트
   * @param {Request} request
   */
  async signupWithAuth(request: Request) {
    try {
      const response = await this.signup(request);
      const cookie = response.headers.get("set-cookie");
      if (!cookie) {
        return redirect(PAGE_ENDPOINTS.AUTH.SIGNUP, {
          status: STATUS_CODE.BAD_REQUEST,
        });
      }
      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: this.getAuthHeaders(cookie),
      });
    } catch (error) {
      const error_validation = this.readValidateError(error);
      if (error_validation) {
        return error_validation;
      }

      const error_fetch = await this.readFetchError(error);
      if (error_fetch) {
        return error_fetch;
      }

      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그인 후 리다이렉트
   * @param {Request} request
   */
  async signinWithAuth(request: Request) {
    try {
      const response = await this.signin(request);
      const cookie = response.headers.get("set-cookie");
      if (!cookie) {
        return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
          status: STATUS_CODE.BAD_REQUEST,
        });
      }
      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: this.getAuthHeaders(cookie),
      });
    } catch (error) {
      const error_validation = this.readValidateError(error);
      if (error_validation) {
        return error_validation;
      }

      const error_fetch = await this.readFetchError(error);
      if (error_fetch) {
        return error_fetch;
      }

      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 세션 가져오기
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getMeApi> | null>}
   */
  async getSession(request: Request): Promise<UserRespSchema | null> {
    const cookie = this.readHeaderCookie(request);

    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }

    if (!accessToken) {
      return null;
    }

    try {
      const { json } = await getMeApi({ request });
      if (json.resultCode !== RESULT_CODE.OK) {
        return null;
      }

      return json.result;
    } catch (error) {
      if (error instanceof FetchError) {
        if ([403, 401].includes(error.response.status)) {
          await this.logout(request);
        }
      }
      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그아웃
   * @param {Request} request
   */
  async logout(request: Request) {
    const cookie = this.readHeaderCookie(request);
    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }
    if (!accessToken) {
      return true;
    }

    try {
      const { json } = await logoutApi({ request });
      if (json.resultCode !== RESULT_CODE.OK) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @version 2023-08-17
   * @description 인증 여부
   * @param {Request} request
   */
  async isAuthenticated(request: Request) {
    const session = await this.getSession(request);
    return !!session;
  }

  /**
   * @version 2023-08-17
   * @description 쿠키 읽기
   * @param {Request} request
   */
  private readHeaderCookie(request: Request) {
    const cookie =
      request.headers.get("Cookie") ||
      request.headers.get("Set-Cookie") ||
      null;
    return cookie;
  }

  /**
   * @version 2023-08-17
   * @description FormData 읽기
   * @param {Request} request
   */
  private async readFormData(request: Request) {
    return await request.formData();
  }

  /**
   * @version 2023-08-17
   * @description error fetch
   * @param {unknown} error
   */
  private async readFetchError(error: unknown) {
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
        };
      } else {
        return {
          statusCode: $response.status,
          errors: {
            error: "알 수 없는 에러가 발생했습니다.",
          },
        };
      }
    }
    return null;
  }

  /**
   * @version 2023-08-17
   * @description error validation
   * @param {unknown} error
   */
  private readValidateError(error: unknown) {
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
      };
    }
    return null;
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
}
