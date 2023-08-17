import cookies from "cookie";
import { signinSchema } from "~/api/auth/validation/signin";
import { signupSchema } from "~/api/auth/validation/signup";

import { signinApi } from "~/api/auth/signin.server";
import { logoutApi } from "~/api/user/logout.server";
import { signupApi } from "~/api/auth/signup.server";
import { getMeApi } from "~/api/user/me.server";

import { HTTPError } from "~/api/error";

import { RESULT_CODE } from "~/constants/constant";

// types
import type { Env } from "../env";
import type { UserRespSchema } from "~/api/schema/resp";

export class AuthApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 로그인 API
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof signinApi>>}
   */
  async signin(request: Request): Promise<ReturnType<typeof signinApi>> {
    const formData = await this.readFormData(request);
    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const parse = await signinSchema.parseAsync(input);
    return await signinApi(parse);
  }

  /**
   * @description 회원가입 API
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof signupApi>>}
   */
  async signup(request: Request): Promise<ReturnType<typeof signupApi>> {
    const formData = await this.readFormData(request);
    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    const parse = await signupSchema.parseAsync(input);
    return await signupApi({
      email: parse.email,
      username: parse.username,
      password: parse.password,
    });
  }

  /**
   * @description 로그인 쿠키 생성
   * @param {string} cookieValue
   * @returns {Headers}
   */
  getAuthHeaders(cookieValue: string): Headers {
    const headers = new Headers();
    headers.append("Set-Cookie", cookieValue);
    return headers;
  }

  getClearAuthHeaders(): Headers {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return headers;
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
      if (error instanceof HTTPError) {
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
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }
}
