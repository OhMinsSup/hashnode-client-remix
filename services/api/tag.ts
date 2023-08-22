import { getTagListApi } from "~/api/tags/tags";
import { getTagApi } from "~/api/tags/tag.server";

import { RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import { parseUrlParams } from "~/utils/util";

import { getTagsApi as $getTagsApi } from "services/fetch/tags/gets-api.server";
import { getTagApi as $getTagApi } from "services/fetch/tags/get-api.server";

import { schema as $getSchema } from "services/validate/tag-get.api.validate";
import { FetchService } from "services/fetch/fetch.client";

// types
import type { Env } from "../env";
import type { GetTagListApiSearchParams } from "~/api/tags/tags";
import type { Params } from "@remix-run/react";

export class TagApiService {
  constructor(private readonly env: Env) {}

  /**
   * @deprecated
   * @description 태그 리스트 가져오기
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getTagListApi>>}
   */
  async getTagList(
    request: Request,
    query?: GetTagListApiSearchParams
  ): Promise<ReturnType<typeof getTagListApi>> {
    return await getTagListApi(query, {
      request,
    });
  }

  /**
   * @deprecated
   * @description 태그 상세 가져오기
   * @param {string} tagName
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getTagApi>>}
   */
  async getTag(
    tagName: string,
    request: Request
  ): Promise<ReturnType<typeof getTagApi>> {
    if (!tagName) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    const resp = await getTagApi(tagName, {
      request,
    });
    if (resp.json?.resultCode !== RESULT_CODE.OK) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    return resp;
  }

  /**
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {FetchSchema.TagListQuery} query
   * @param {Request} request
   */
  list(query: FetchSchema.TagListQuery, request: Request) {
    return $getTagsApi(query, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 태그 상세 정보 API
   * @param {Params} params
   * @param {Request} request
   */
  async get(params: Params, request: Request) {
    const input = await $getSchema.parseAsync(params);
    return $getTagApi(input.name, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 태그 상세 정보 API
   * @param {Params} params
   * @param {Request} request
   */
  async getTagByName(params: Params, request: Request) {
    try {
      const response = await this.get(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.TagDetailRespSchema>(
          response
        );
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
   * @param {FetchSchema.TagListQuery} query
   * @param {Request} request
   */
  async getTagsByBaseList(query: FetchSchema.TagListQuery, request: Request) {
    try {
      const response = await this.list(query, request);
      const json =
        await FetchService.toJson<FetchRespSchema.TagListRespSchema>(response);

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
  async getTagsByList(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getTagsByBaseList(params, request);
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
