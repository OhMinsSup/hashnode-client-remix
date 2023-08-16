import { getTagListApi } from "~/api/tags/tags";
import { getTagApi } from "~/api/tags/tag.server";
import { RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// types
import type { Env } from "../env";
import type { GetTagListApiSearchParams } from "~/api/tags/tags";

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

  async getTagListByHomePopular(request: Request) {
    try {
      const { json: data } = await this.getTagList(request, {
        type: "popular",
        limit: 4,
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
