import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

import { safeRedirect } from "remix-utils/safe-redirect";
import { redirect } from "@remix-run/cloudflare";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";
import { BaseError, ErrorType, ResponseError } from "../error";

export class PostDraftApiService {
  constructor(private readonly opts: HashnodeApiConstructorOptions) {}

  private get $server() {
    return this.opts.services.server;
  }

  private get $toast() {
    return this.opts.services.toast;
  }

  private get $agent() {
    return this.opts.services.agent;
  }

  async createDraft(request: Request, ignoreMethods = false) {
    const redirectUrl = safeRedirect(PAGE_ENDPOINTS.ROOT);

    try {
      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "authentication failed. Please try again later."
        );
        throw error;
      }

      if (!ignoreMethods) {
        this.$server.readValidateMethods(request, ["POST"], redirectUrl);
      }

      const response = await this.$agent.postCreateHandler(
        { title: "Untitled", isDraft: true },
        {
          headers: {
            Cookie: cookie,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.body;
      if (data?.resultCode !== RESULT_CODE.OK) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "failed to update the user. Please try again later."
        );
        throw error;
      }

      const result = data.result as FetchRespSchema.DataIDResp;
      return redirect(safeRedirect(PAGE_ENDPOINTS.WRITE.ID(result.dataId)));
    } catch (error) {
      await this.validateInput(error, redirectUrl);

      await this.validateFetchError(error, redirectUrl);

      await this.errorToast(error, redirectUrl);
    }
  }

  /**
   * @description 게시물 삭제하기
   * @param {Request} request
   */
  async deleteDraft(id: string, request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        return {
          ok: true,
          statusCode: STATUS_CODE.UNAUTHORIZED,
          resultCode: RESULT_CODE.NO_AUTH_TOKEN,
          error: "authentication failed. Please try again later.",
        };
      }

      const response = await this.$agent.postDeleteHandler(id, {
        headers: {
          Cookie: cookie,
          "Content-Type": "application/json",
        },
      });

      const data = await response.body;
      if (data?.resultCode !== RESULT_CODE.OK) {
        return {
          statusCode: STATUS_CODE.OK,
          resultCode: data.resultCode,
          error: data.message,
          ok: false,
        };
      }

      return {
        ok: true,
        statusCode: STATUS_CODE.OK,
        resultCode: RESULT_CODE.OK,
        error: null,
      };
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorData = error.getResponseErrorData();
        const data = await error.response.json<FetchRespSchema.Error>();
        return {
          ok: false,
          statusCode: errorData.response.status,
          resultCode: data.resultCode,
          error: data.message,
        };
      }

      return {
        ok: false,
        statusCode: STATUS_CODE.SERVER_ERROR,
        resultCode: RESULT_CODE.UNKNOWN_ERROR,
        error: "An unknown error occurred.",
      };
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
   * @description 에러 공통 처리 (토스트)
   * @param {unknown} error
   * @param {string} redirectUrl
   */
  async errorToast(error: unknown, redirectUrl: string) {
    if (error instanceof BaseError) {
      throw await this.$server.redirectWithToast(
        redirectUrl,
        this.$toast.getToastMessage({
          description: error.message,
        }),
        this.$toast.createToastHeaders
      );
    }

    const response = await this.$server.redirectWithToast(
      redirectUrl,
      this.$toast.getToastMessage(),
      this.$toast.createToastHeaders
    );

    throw response;
  }
}
