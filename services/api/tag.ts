import { getTagListApi } from "~/api/tags/tags";
import { getTagApi } from "~/api/tags/tag.server";
import { RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// types
import type { Env } from "../env";
import type { GetTagListApiSearchParams } from "~/api/tags/tags";
import { parseUrlParams } from "~/utils/util";

export class TagApiService {
  constructor(private readonly env: Env) {}

  /**
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
   * @description loader에서 호출 할 때 사용하는 함수 (인기 태그 추천 태그)
   * @param {Request} request
   * @param {string} type
   */
  async getTagsByList(
    request: Request,
    type?: "recent" | "popular" | "new" | "trending" | undefined
  ) {
    const params = parseUrlParams(request.url);
    let cursor = undefined;
    if (params.cursor) {
      cursor = parseInt(params.cursor);
    }
    let limit = undefined;
    if (params.limit) {
      limit = parseInt(params.limit);
    }
    let name = undefined;
    if (params.name) {
      name = params.name;
    }
    if (params.type) {
      type = params.type;
    }

    try {
      const { json: data } = await this.getTagList(request, {
        cursor,
        limit,
        name,
        type,
      });

      const { result, resultCode } = data;
      if (resultCode !== RESULT_CODE.OK) {
        return this.getDefaultTagList();
      }

      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultTagList();
    }
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
