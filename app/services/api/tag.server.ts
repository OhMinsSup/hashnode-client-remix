import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { parseUrlParams } from "~/utils/util";

import { getTagsApi as $getTagsApi } from "~/services/fetch/tags/gets-api.server";
import { getTagApi as $getTagApi } from "~/services/fetch/tags/get-api.server";
import { postTagFollowApi as $tagFollowApi } from "~/services/fetch/tags/tag-follow-api.server";

import { schema as $tagFollowSchema } from "~/services/validate/tag-follow-api.validate";
import { schema as $idSchema } from "~/services/validate/id.validate";
import { FetchService } from "~/services/fetch/fetch.api";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";
import { redirect, type Params } from "@remix-run/react";
import type { FormFieldValues } from "../validate/tag-follow-api.validate";
import { safeRedirect } from "remix-utils/safe-redirect";
import { BaseError, ErrorType } from "../error";

export class TagApiService {
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
   * @deprecated
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {FetchQuerySchema.TagList} query
   * @param {Request} request
   */
  list(query: FetchQuerySchema.TagList, request: Request) {
    return $getTagsApi(query, {
      request,
    });
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 팔로우 API
   * @param {FormFieldValues} input
   * @param {Request} request
   */
  follow(input: FormFieldValues, request: Request) {
    return $tagFollowApi(input, {
      request,
    });
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 상세 정보 API
   * @param {IdFormFieldValues} id
   * @param {Request} request
   */
  get(id: string, request: Request) {
    return $getTagApi(id, {
      request,
    });
  }

  /**
   * @deprecated
   * @param request
   * @returns
   */
  async upsertTagFollow(request: Request) {
    const formData = await this.$server.readFormData(request);

    const defaultToastOpts = {
      title: "error",
      description: "failed to follow the tag. Please try again later.",
      type: "error" as const,
    };

    const redirectUrl = (formData.get("redirectUrl") ||
      PAGE_ENDPOINTS.ROOT) as string;

    const input = {
      tagId: formData.get("tagId"),
    };

    try {
      const parse = await $tagFollowSchema.parseAsync(input);
      const response = await this.follow(parse, request);
      const json =
        await FetchService.toJson<FetchRespSchema.TagFollowResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "TagFollowError";
        error.message = "failed to follow the tag. Please try again later.";
        throw error;
      }
      return json.result;
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          redirectUrl,
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          redirectUrl,
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        redirectUrl,
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 상세 정보 API
   * @param {Params} params
   * @param {Request} request
   */
  async getTag(params: Params, request: Request) {
    try {
      const input = await $idSchema.parseAsync(params);
      const response = await this.get(input.id, request);
      const json =
        await FetchService.toJson<FetchRespSchema.TagDetailResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return new Response("Not Found", { status: 404 });
      }
      return json.result;
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {FetchQuerySchema.TagList} query
   * @param {Request} request
   */
  async getBaseTags(query: FetchQuerySchema.TagList, request: Request) {
    try {
      const response = await this.list(query, request);
      const json =
        await FetchService.toJson<FetchRespSchema.TagListResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultTagList();
      }
      const result = json.result;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultTagList();
    }
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {Request} request
   */
  async getTags(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getBaseTags(params, request);
  }

  /**
   * @deprecated
   * @deprecated
   * @version 2023-08-17
   * @description 메인화면에서 최대 4개만 보여주는 인기 태그 리스트
   * @param {Request} request
   */
  async getMainTrendingTagsLimit4(request: Request) {
    const params = {
      type: "popular" as const,
      limit: 4,
    };
    return this.getBaseTags(params, request);
  }

  private getDefaultTagList() {
    return {
      list: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    };
  }

  async getTagInfo(name: string, request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getTagHandler(name, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
      }
      return data.result as FetchRespSchema.TagDetailResp;
    } catch (error) {
      throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
    }
  }

  async followByTag(name: string, request: Request) {
    const redirectUrl = safeRedirect(PAGE_ENDPOINTS.N.TAG(name));

    try {
      this.$server.readValidateMethods(request, ["POST"], redirectUrl);

      const cookie = this.$server.readHeaderCookie(request);
      if (!cookie) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "authentication failed. Please try again later."
        );
        throw error;
      }
      const input = await $tagFollowSchema.parseAsync({
        slug: name,
      });
      const response = await this.$agent.postTagFollowHandler(input, {
        headers: {
          Cookie: cookie,
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        const error = new BaseError(
          ErrorType.HTTPError,
          "failed to follow the tag. Please try again later."
        );
        throw error;
      }
      return data.result as FetchRespSchema.TagDetailResp;
    } catch (error) {
      console.log(error);
      await this.validateInput(error, redirectUrl);

      await this.validateFetchError(error, redirectUrl);

      await this.errorToast(error, redirectUrl);
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
}
