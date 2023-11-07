import { RESULT_CODE } from "~/constants/constant";
import { parseUrlParams } from "~/utils/util";

import { getTagsApi as $getTagsApi } from "services/fetch/tags/gets-api.server";
import { getTagApi as $getTagApi } from "services/fetch/tags/get-api.server";

import { schema as $getSchema } from "services/validate/tag-get.api.validate";
import { FetchService } from "services/fetch/fetch.client";

// types
import type { Env } from "../app/env.server";
import type { Params } from "@remix-run/react";

export class TagApiService {
  constructor(private readonly env: Env) {}

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
  async getTagsByBaseList(query: FetchQuerySchema.TagList, request: Request) {
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
