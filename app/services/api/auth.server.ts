import cookies from "cookie";
import omit from "lodash-es/omit";
import { redirect } from "@remix-run/cloudflare";

import { schema as $signinSchema } from "~/services/validate/signin-api.validate";
import { schema as $signupSchema } from "~/services/validate/signup-api.validate";

import { signinApi as $signinApi } from "~/services/fetch/auth/signin-api.server";
import { signupApi as $signupApi } from "~/services/fetch/auth/signup-api.server";
import { signoutApi as $signoutApi } from "~/services/fetch/auth/signout-api.server";
import { getMeApi as $getMeApi } from "~/services/fetch/users/me-api.server";

import { FetchService } from "~/services/fetch/fetch.client";
import { FetchError } from "~/services/fetch/fetch.error";

import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// types
import type { Env } from "../app/env.server";
import type { ResponseState, ServerService } from "~/services/app/server.server";
import type { FormFieldValues as SignupFormFieldValues } from "~/services/validate/signup-api.validate";
import type { FormFieldValues as SigninFormFieldValues } from "~/services/validate/signin-api.validate";
import type { CsrfService } from "~/services/app/csrf.server";
import type { HoneypotService } from "~/services/app/honeypot.server";

export class AuthApiService {
  constructor(
    private readonly $env: Env,
    private readonly $server: ServerService,
    private readonly $csrf: CsrfService,
    private readonly $honeypot: HoneypotService
  ) {}

  /**
   * @version 2023-08-17
   * @description 세션 가져오기
   * @param {Request} request
   */
  async getSession(request: Request) {
    const cookie = this.$server.readHeaderCookie(request);

    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }

    if (!accessToken) {
      return null;
    }

    try {
      const response = await $getMeApi({ request });
      const data =
        await FetchService.toJson<FetchRespSchema.UserResponse>(response);
      if (data.resultCode !== RESULT_CODE.OK) {
        return null;
      }

      return data.result;
    } catch (error) {
      if (error instanceof FetchError) {
        if ([403, 401].includes(error.response.status)) {
          await this.signout(request);
        }
      }
      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그인 API
   * @param {SigninFormFieldValues} input
   */
  async signin(input: SigninFormFieldValues) {
    return $signinApi(input);
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 API
   * @param {SignupFormFieldValues} input
   */
  async signup(input: SignupFormFieldValues) {
    return $signupApi(omit(input, ["confirmPassword"]));
  }

  /**
   * @version 2023-08-17
   * @description 로그아웃
   * @param {Request} request
   */
  async signout(request: Request) {
    const cookie = this.$server.readHeaderCookie(request);

    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }

    if (!accessToken) {
      return true;
    }

    try {
      const response = await $signoutApi({ request });
      const data = await FetchService.toJson(response);
      if (data.resultCode !== RESULT_CODE.OK) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그아웃 API
   * @param {Request} request
   */
  async signoutWithAuth(request: Request) {
    await this.signout(request);

    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: this.$server.getClearAuthHeaders(),
    });
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 후 리다이렉트
   * @param {Request} request
   */
  async signupWithAuth(request: Request) {
    const formData = await this.$server.readFormData(request);

    await this.$csrf.validateCSRF(formData, request.headers);
    this.$honeypot.checkHoneypot(formData);

    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      const parse = await $signupSchema.parseAsync(input);
      const response = await this.signup(parse);
      const cookie = response.headers.get("set-cookie");
      if (!cookie) {
        return redirect(PAGE_ENDPOINTS.AUTH.SIGNUP, {
          status: STATUS_CODE.BAD_REQUEST,
        });
      }
      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: this.$server.getAuthHeaders(cookie),
      });
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        return error_validation;
      }

      const error_fetch = await this.$server.readFetchError(error);
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
    const formData = await this.$server.readFormData(request);

    await this.$csrf.validateCSRF(formData, request.headers);
    this.$honeypot.checkHoneypot(formData);

    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const parse = await $signinSchema.parseAsync(input);
      const response = await this.signin(parse);

      const cookie = response.headers.get("set-cookie");
      if (!cookie) {
        return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
          status: STATUS_CODE.BAD_REQUEST,
        });
      }
      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: this.$server.getAuthHeaders(cookie),
      });
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        return error_validation;
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        const isNotExistsUser = this._isNotExistsUser(error_fetch);
        if (isNotExistsUser) {
          return this.$server.getResponse<boolean>(isNotExistsUser);
        }
        return error_fetch;
      }

      return null;
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
   * @description 회원가입 여부
   * @param {ResponseState} state
   */
  private _isNotExistsUser(state: ResponseState) {
    return state
      ? !!(
          state?.data &&
          state?.data?.status &&
          state?.data?.status === RESULT_CODE.NOT_EXIST
        )
      : false;
  }
}
