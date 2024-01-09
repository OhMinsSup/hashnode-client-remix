import cookies from "cookie";
import omit from "lodash-es/omit";
import { redirect } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";

import { schema as $signinSchema } from "~/services/validate/signin-api.validate";
import { schema as $signupSchema } from "~/services/validate/signup-api.validate";

import { getMeApi as $getMeApi } from "~/services/fetch/users/me-api.server";

import { FetchService } from "~/services/fetch/fetch.api";

import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";

export class AuthApiService {
  constructor(private readonly opts: HashnodeApiConstructorOptions) {}

  private get $server() {
    return this.opts.services.server;
  }

  private get $csrf() {
    return this.opts.services.csrf;
  }

  private get $honeypot() {
    return this.opts.services.honeypot;
  }

  private get $toast() {
    return this.opts.services.toast;
  }

  private get $agent() {
    return this.opts.services.agent;
  }

  /**
   * @version 2023-08-17
   * @description 로그아웃 API
   * @param {Request} request
   */
  signoutWithAuth(request: Request) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: this.$server.getClearAuthHeaders(),
    });
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 후 리다이렉트
   * @param {Request} request
   */
  async signupWithRedirect(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const redirectUrl = safeRedirect(
      `${PAGE_ENDPOINTS.AUTH.SIGNUP}?${searchParams.toString()}`
    );

    this.$server.readValidateMethod(request, "POST", redirectUrl);

    const formData = await this.$server.readFormData(request);

    await this.validateCSRF(formData, request.headers, redirectUrl);

    await this.checkHoneypot(formData, redirectUrl);

    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      const parse = await $signupSchema.parseAsync(input);
      const response = await this.$agent.signupHandler(
        omit(parse, ["confirmPassword"]),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const cookie = response.headers["set-cookie"];
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
        headers: cookie ? this.$server.getAuthHeaders(cookie) : undefined,
      });
    } catch (error) {
      await this.validateInput(error, redirectUrl);

      await this.validateFetchError(error, redirectUrl);

      await this.errorToast(error, redirectUrl);
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그인 후 리다이렉트
   * @param {Request} request
   */
  async signinWithRedirect(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const redirectUrl = safeRedirect(
      `${PAGE_ENDPOINTS.AUTH.SIGNIN}?${searchParams.toString()}`
    );

    this.$server.readValidateMethod(request, "POST", redirectUrl);

    const formData = await this.$server.readFormData(request);

    await this.validateCSRF(formData, request.headers, redirectUrl);

    await this.checkHoneypot(formData, redirectUrl);

    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const parse = await $signinSchema.parseAsync(input);
      const response = await this.$agent.signinHandler(parse, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cookie = response.headers["set-cookie"];
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
        headers: cookie ? this.$server.getAuthHeaders(cookie) : undefined,
      });
    } catch (error) {
      await this.validateInput(error, redirectUrl);

      const redirectUrlToSignup = safeRedirect(
        `${PAGE_ENDPOINTS.AUTH.SIGNUP}?email=${input.email}`
      );
      await this.validateSigninFethError(
        error,
        redirectUrl,
        redirectUrlToSignup
      );

      await this.errorToast(error, redirectUrl);
    }
  }

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
   * @description 에러 공통 처리 (토스트)
   * @param {unknown} error
   * @param {string} redirectUrl
   */
  async errorToast(error: unknown, redirectUrl: string) {
    const response = await this.$server.redirectWithToast(
      redirectUrl,
      this.$toast.getToastMessage(),
      this.$toast.createToastHeaders
    );

    throw response;
  }

  /**
   * @version 2023-08-17
   * @description 로그인 응답값에 대한 에러처리
   * @param {unknown} error
   * @param {string} redirectUrl
   * @param {string} redirectUrlToSignup
   */
  async validateSigninFethError(
    error: unknown,
    redirectUrl: string,
    redirectUrlToSignup: string
  ) {
    const error_fetch = await this.$server.readFetchError(error);
    if (error_fetch) {
      const isNotExistsUser =
        error_fetch.data?.resultCode === RESULT_CODE.NOT_EXIST;
      if (isNotExistsUser) throw redirect(redirectUrlToSignup);

      const resposne = await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description: Object.values(error_fetch.error ?? {})?.at(0),
        }),
        this.$toast.createToastHeaders
      );

      throw resposne;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그인 응답값에 대한 에러처리
   * @param {unknown} error
   * @param {string} redirectUrl
   */
  async validateFetchError(error: unknown, redirectUrl: string) {
    const error_fetch = await this.$server.readFetchError(error);
    if (error_fetch) {
      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description: Object.values(error_fetch.error ?? {})?.at(0),
        }),
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @version 2023-08-17
   * @description 입력값 검증
   * @param {unknown} error
   * @param {string} redirectUrl
   */
  async validateInput(error: unknown, redirectUrl: string) {
    const error_validation = this.$server.readValidateError(error);
    if (error_validation) {
      const response = await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description: Object.values(error_validation.error ?? {})?.at(0),
        }),
        this.$toast.createToastHeaders
      );
      throw response;
    }
  }

  /**
   * @version 2023-08-17
   * @description CSRF 검증
   * @param {FormData} formData
   * @param {Headers} headers
   * @param {string} redirectUrl
   */
  async validateCSRF(
    formData: FormData,
    headers: Headers,
    redirectUrl: string
  ) {
    try {
      await this.$csrf.validateCSRF(formData, headers);
    } catch (error) {
      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description:
            "You tried to authenticate with an invalid access. Please try again.",
        }),
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @version 2023-08-17
   * @description Honeypot 검증
   * @param {FormData} formData
   * @param {string} redirectUrl
   */
  async checkHoneypot(formData: FormData, redirectUrl: string) {
    try {
      await this.$honeypot.checkHoneypot(formData);
    } catch (error) {
      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description:
            "You tried to authenticate with an invalid access. Please try again.",
        }),
        this.$toast.createToastHeaders
      );
    }
  }
}
