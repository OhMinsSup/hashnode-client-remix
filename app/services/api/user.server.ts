import Json from "superjson";
import { redirect } from "@remix-run/cloudflare";
import { BaseError, ErrorType } from "~/services/error";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { parseUrlParams } from "~/utils/util";
import { safeRedirect } from "remix-utils/safe-redirect";

import { getUserApi as $getUserApi } from "~/services/fetch/users/get-api.server";
import { getUsersApi as $getUsersApi } from "~/services/fetch/users/gets-api.server";
import { getUserHistoriesApi as $getUserHistoriesApi } from "~/services/fetch/users/get-histories.server";
import { getOwnerPostDetailApi as $getOwnerPostDetailApi } from "~/services/fetch/users/get-owner-post-api.server";
import { postUserFollowApi as $postUserFollowApi } from "~/services/fetch/users/user-follow-api.server";

import { schema as $updateSchema } from "~/services/validate/user-update-api.validate";
import {
  schema as $followSchema,
  type FormFieldValues as FollowFormFieldValues,
} from "~/services/validate/user-follow-api.validate";
import { FetchService } from "~/services/fetch/fetch.api";
import {
  schema as $idSchema,
  type FormFieldValues as IdFormFieldValues,
} from "~/services/validate/id.validate";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";

export class UserApiService {
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

  /**
   * @version 2023-08-17
   * @description 유저 팔로우 API
   * @param {FollowFormFieldValues} input
   * @param {Request} request
   */
  follow(input: FollowFormFieldValues, request: Request) {
    return $postUserFollowApi(input, {
      request,
    });
  }

  /**
   * @description 아이템 리스트
   * @param {FetchQuerySchema.UserList} query
   * @param {Request} request
   */
  list(query: FetchQuerySchema.UserList, request: Request) {
    return $getUsersApi(query, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 작성자만 볼 수 있는 포스트 상세 조회 API
   * @param {string | number} id
   * @param {Request} request
   */
  getOwnerPostDetail(id: string | number, request: Request) {
    return $getOwnerPostDetailApi(id, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 유저 상세 정보 API
   * @param {string} id
   * @param {Request} request
   */
  get(id: string, request: Request) {
    return $getUserApi(id, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 유저 히스토리 정보 API
   * @param {string} id
   * @param {Request} request
   */
  getHistories(id: string, request: Request) {
    return $getUserHistoriesApi(id, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 작성자만 볼 수 있는 포스트 상세 조회
   * @param {Request} request
   * @param {string | number} id
   */
  async getOwnerPostDetailByUser(
    request: Request,
    id?: string | number | null
  ) {
    try {
      const input = await $idSchema.parseAsync({ id });
      const response = await this.getOwnerPostDetail(input.id, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostDetailResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "PostDetailError";
        error.message = "post not found. Please try again later.";
        throw error;
      }
      return json.result;
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          {
            title: "error",
            description: "post id is not valid. Please try again later.",
            type: "error",
          },
          this.$toast.createToastHeaders,
          {
            status: 404,
          }
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          {
            title: "error",
            description: "post not found. Please try again later.",
            type: "error",
          },
          this.$toast.createToastHeaders,
          {
            status: 404,
          }
        );
      }

      throw await this.$server.redirectWithToast(
        safeRedirect(PAGE_ENDPOINTS.ROOT),
        {
          title: "error",
          description:
            "An error occurred while signing in. Please try again later.",
          type: "error",
        },
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 상세
   * @param {IdFormFieldValues} params
   * @param {Request} request
   */
  async getByUserHistories(
    params: Partial<IdFormFieldValues>,
    request: Request
  ) {
    try {
      const input = await $idSchema.parseAsync(params);
      const response = await this.getHistories(input.id, request);
      const json =
        await FetchService.toJson<FetchRespSchema.UserHistoryResp[]>(response);
      return json.result ?? [];
    } catch (error) {
      return [];
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 상세
   * @param {IdFormFieldValues} params
   * @param {Request} request
   */
  async getByUser(params: Partial<IdFormFieldValues>, request: Request) {
    try {
      const input = await $idSchema.parseAsync(params);
      const response = await this.get(input.id, request);
      const json =
        await FetchService.toJson<FetchRespSchema.UserResponse>(response);

      const data = json.result;
      if (!data) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          {
            title: "error",
            description: "user not found. Please try again later.",
            type: "error",
          },
          this.$toast.createToastHeaders
        );
      }

      return data;
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          {
            title: "error",
            description: "user id is not valid. Please try again later.",
            type: "error",
          },
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          {
            title: "error",
            description: "user not found. Please try again later.",
            type: "error",
          },
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        safeRedirect(PAGE_ENDPOINTS.ROOT),
        {
          title: "error",
          description:
            "An error occurred while signing in. Please try again later.",
          type: "error",
        },
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 탈퇴
   * @param {Request} request
   */
  async deleteUser(request: Request) {
    const redirectUrl = safeRedirect(PAGE_ENDPOINTS.SETTINGS.ACCOUNT);

    try {
      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "authentication failed. Please try again later."
        );
        throw error;
      }

      this.$server.readValidateMethods(request, ["DELETE"], redirectUrl);

      const response = await this.$agent.deleteMeHandler({
        headers: {
          Cookie: cookie,
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data?.resultCode !== RESULT_CODE.OK) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "failed to delete the user. Please try again later."
        );
        throw error;
      }
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
        headers: this.$server.getClearAuthHeaders(),
      });
    } catch (error) {
      await this.validateFetchError(error, redirectUrl);

      await this.errorToast(error, redirectUrl);
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 수정
   * @param {Request} request
   */
  async putUser(request: Request) {
    const redirectUrl = safeRedirect(PAGE_ENDPOINTS.SETTINGS.ROOT);

    try {
      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "authentication failed. Please try again later."
        );
        throw error;
      }

      this.$server.readValidateMethods(request, ["PUT"], redirectUrl);

      const formData = await this.$server.readFormData(request);

      const input = Json.parse(formData.get("body")?.toString() ?? "{}");

      const parse = await $updateSchema.parseAsync(input);

      const response = await this.$agent.putMeHandler(parse, {
        headers: {
          Cookie: cookie,
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data?.resultCode !== RESULT_CODE.OK) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "failed to update the user. Please try again later."
        );
        throw error;
      }
      return redirect(redirectUrl);
    } catch (error) {
      await this.validateInput(error, redirectUrl);

      await this.validateFetchError(error, redirectUrl);

      await this.errorToast(error, redirectUrl);
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 팔로우 등록 및 취소
   * @param {Request} request
   */
  async upsertUserFollow(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const redirectUrl = safeRedirect(
      searchParams.get("redirectUrl") ?? PAGE_ENDPOINTS.ROOT
    );

    this.$server.readValidateMethods(request, ["POST", "DELETE"], redirectUrl);

    const formData = await this.$server.readFormData(request);

    const input = {
      userId: formData.get("userId"),
    };

    try {
      const parse = await $followSchema.parseAsync(input);
      const response = await this.follow(parse, request);
      const json =
        await FetchService.toJson<FetchRespSchema.UserFollowResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "UserFollowError";
        error.message = "failed to follow the user. Please try again later.";
        throw error;
      }
      return json.result;
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
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {FetchQuerySchema.UserList} params
   * @param {Request} request
   */
  async getUsersByBaseList(
    params: FetchQuerySchema.UserList,
    request: Request
  ) {
    try {
      const response = await this.list(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.UserListResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultUserList();
      }
      const result = json.result;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultUserList();
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 리스트 가져오기
   * @param {Request} request
   */
  async getUsersByList(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getUsersByBaseList(params, request);
  }

  /**
   * @version 2023-08-17
   * @description 메인화면에서 최대 4개만 보여주는 인기 유저 리스트
   * @param {Request} request
   */
  async getMainTrendingUsersLimit4(request: Request) {
    const params = {
      limit: 4,
    };
    return this.getUsersByBaseList(params, request);
  }

  /**
   * @version 2023-08-17
   * @description 기본 포스트 리스트
   */
  private getDefaultUserList() {
    return {
      list: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    };
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
