import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { parseUrlParams } from "~/utils/util";

import { getTagsApi as $getTagsApi } from "~/services/fetch/tags/gets-api.server";
import { getTagApi as $getTagApi } from "~/services/fetch/tags/get-api.server";
import { postTagFollowApi as $tagFollowApi } from "~/services/fetch/tags/tag-follow-api.server";

import { schema as $tagFollowSchema } from "~/services/validate/tag-follow-api.validate";
import { schema as $idSchema } from "~/services/validate/id.validate";
import { FetchService } from "~/services/fetch/fetch.api";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { Params } from "@remix-run/react";
import type { FormFieldValues } from "../validate/tag-follow-api.validate";
import type { ToastService } from "../app/toast.server";

export class TagApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService,
    private readonly $toast: ToastService
  ) {}

  /**
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
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {Request} request
   */
  async getTags(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getBaseTags(params, request);
  }

  /**
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
}
