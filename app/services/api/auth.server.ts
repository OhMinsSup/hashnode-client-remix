import cookies from "cookie";
import omit from "lodash-es/omit";
import { redirect } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";

import { schema as $signinSchema } from "~/services/validate/signin-api.validate";
import { schema as $signupSchema } from "~/services/validate/signup-api.validate";

import { signinApi as $signinApi } from "~/services/fetch/auth/signin-api.server";
import { signupApi as $signupApi } from "~/services/fetch/auth/signup-api.server";
import { getMeApi as $getMeApi } from "~/services/fetch/users/me-api.server";

import { FetchService } from "~/services/fetch/fetch.api";

import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { FormFieldValues as SignupFormFieldValues } from "~/services/validate/signup-api.validate";
import type { FormFieldValues as SigninFormFieldValues } from "~/services/validate/signin-api.validate";
import type { CsrfService } from "~/services/app/csrf.server";
import type { HoneypotService } from "~/services/app/honeypot.server";
import type { ToastService } from "../app/toast.server";

export class AuthApiService {
  constructor(
    private readonly $env: Env,
    private readonly $server: ServerService,
    private readonly $csrf: CsrfService,
    private readonly $honeypot: HoneypotService,
    private readonly $toast: ToastService
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
      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 로그인 API
   * @param {SigninFormFieldValues} input
   */
  signin(input: SigninFormFieldValues) {
    return $signinApi(input);
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 API
   * @param {SignupFormFieldValues} input
   */
  signup(input: SignupFormFieldValues) {
    return $signupApi(omit(input, ["confirmPassword"]));
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

    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      await this.$csrf.validateCSRF(formData, request.headers);
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

    try {
      const parse = await $signupSchema.parseAsync(input);
      const response = await this.signup(parse);
      const cookie = response.headers.get("set-cookie");
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
        headers: cookie ? this.$server.getAuthHeaders(cookie) : undefined,
      });
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          redirectUrl,
          this.$toast.getToastMessage({
            description: Object.values(error_validation.error ?? {})?.at(0),
          }),
          this.$toast.createToastHeaders
        );
      }

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

      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage(),
        this.$toast.createToastHeaders
      );
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

    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await this.$csrf.validateCSRF(formData, request.headers);
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

    try {
      const parse = await $signinSchema.parseAsync(input);
      const response = await this.signin(parse);
      const cookie = response.headers.get("set-cookie");
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
        headers: cookie ? this.$server.getAuthHeaders(cookie) : undefined,
      });
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          redirectUrl,
          this.$toast.getToastMessage({
            description: Object.values(error_validation.error ?? {})?.at(0),
          }),
          this.$toast.createToastHeaders
        );
      }

      const redirectUrlToSignup = safeRedirect(
        `${PAGE_ENDPOINTS.AUTH.SIGNUP}?email=${input.email}`
      );
      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        const isNotExistsUser =
          error_fetch.data?.resultCode === RESULT_CODE.NOT_EXIST;
        if (isNotExistsUser) throw redirect(redirectUrlToSignup);

        throw await this.$server.redirectWithToast(
          redirectUrl,
          this.$toast.getToastMessage({
            description: Object.values(error_fetch.error ?? {})?.at(0),
          }),
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage(),
        this.$toast.createToastHeaders
      );
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
}
