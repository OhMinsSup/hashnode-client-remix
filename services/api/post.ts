import { RESULT_CODE } from "~/constants/constant";
import { getPostsApi as $getPostsApi } from "services/fetch/posts/gets-api.server";
import { getLikePostsApi as $getLikePostsApi } from "services/fetch/posts/gets-like-api.server";
import { getTopPostsApi as $getTopPostsApi } from "services/fetch/posts/gets-top-api.server";

import { FetchService } from "services/fetch/fetch.client";

// utils
import { parseUrlParams } from "~/utils/util";

// types
import type { Env } from "../env";
import type { ServerService } from "services/app/server";

export class PostApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @description 아이템 리스트
   * @param {FetchSchema.PostListQuery} query
   * @param {Request} request
   */
  async list(query: FetchSchema.PostListQuery, request: Request) {
    return await $getPostsApi(query, {
      request,
    });
  }

  /**
   * @description 좋아요 아이템 리스트
   * @param {FetchSchema.PaginationQuery} query
   * @param {Request} request
   */
  async likeList(query: FetchSchema.PaginationQuery, request: Request) {
    return await $getLikePostsApi(query, {
      request,
    });
  }

  /**
   * @description 탑 포스트 가져오기
   * @param {FetchSchema.GetTopPostsQuery} query
   * @param {Request} request
   */
  async topList(query: FetchSchema.GetTopPostsQuery, request: Request) {
    return await $getTopPostsApi(query, {
      request,
    });
  }

  /**
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {FetchSchema.PostListQuery} params
   * @param {Request} request
   */
  async getPostsByBaseList(
    params: FetchSchema.PostListQuery,
    request: Request
  ) {
    try {
      const response = await this.list(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostListRespSchema>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = json.result;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  /**
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {Request} request
   */
  async getPostsByList(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getPostsByBaseList(params, request);
  }

  /**
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (좋아요)
   * @param {Request} request
   */
  async getPostsByLikeList(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      const response = await this.likeList(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostLikeListRespSchema>(
          response
        );
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = json.result;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  /**
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (top posts)
   * @param {Request} request
   */
  async getPostsByTop(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      let duration = 7;
      if (params.duration && isNaN(parseInt(params.duration)) === false) {
        duration = parseInt(params.duration);
      }

      const response = await this.topList(
        {
          duration,
        },
        request
      );
      const json =
        await FetchService.toJson<FetchRespSchema.GetTopPostsRespSchema>(
          response
        );
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = json.result;
      return {
        list: result.posts,
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
        totalCount: result.posts.length,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  private getDefaultPostList() {
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
