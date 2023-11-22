import Json from "superjson";

import { RESULT_CODE } from "~/constants/constant";
import { getPostsApi as $getPostsApi } from "~/services/fetch/posts/gets-api.server";
import { getLikePostsApi as $getLikePostsApi } from "~/services/fetch/posts/gets-like-api.server";
import { getTopPostsApi as $getTopPostsApi } from "~/services/fetch/posts/gets-top-api.server";
import { getDraftPostsApi as $getDraftPostsApi } from "~/services/fetch/posts/gets-draft-api.server";
import { createPostApi as $createPostApi } from "~/services/fetch/posts/create-api.server";
import { getPostApi as $getPostApi } from "~/services/fetch/posts/get-api.server";
import { deletePostApi as $deletePostApi } from "~/services/fetch/posts/delete-api.server";
import { getDeletePostsApi as $getDeletePostsApi } from "~/services/fetch/posts/gets-deleted-api.server";

import { FetchService } from "~/services/fetch/fetch.api";
import { schema as $createSchema } from "~/services/validate/post-create-api.validate";

// utils
import { parseUrlParams } from "~/utils/util";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";

export class PostApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @description 아이템 리스트
   * @param {FetchQuerySchema.PostList} query
   * @param {Request} request
   */
  async list(query: FetchQuerySchema.PostList, request: Request) {
    return await $getPostsApi(query, {
      request,
    });
  }

  /**
   * @description 좋아요 아이템 리스트
   * @param {FetchQuerySchema.PostList} query
   * @param {Request} request
   */
  async likeList(query: FetchQuerySchema.PostList, request: Request) {
    return await $getLikePostsApi(query, {
      request,
    });
  }

  /**
   * @description 탑 포스트 가져오기
   * @param {FetchQuerySchema.GetTopPost} query
   * @param {Request} request
   */
  async topList(query: FetchQuerySchema.GetTopPost, request: Request) {
    return await $getTopPostsApi(query, {
      request,
    });
  }

  /**
   * @description 초안작성 포스트 가져오기
   * @param {FetchQuerySchema.Pagination} query
   * @param {Request} request
   */
  async draftList(query: FetchQuerySchema.Pagination, request: Request) {
    return await $getDraftPostsApi(query, {
      request,
    });
  }

  /**
   * @description 삭제 포스트 가져오기
   * @param {FetchQuerySchema.Pagination} query
   * @param {Request} request
   */
  async deleteList(query: FetchQuerySchema.Pagination, request: Request) {
    return await $getDeletePostsApi(query, {
      request,
    });
  }

  /**
   * @description 포스트 상세 읽기
   * @param {string | number} id
   * @param {Request} request
   */
  async get(id: string | number, request: Request) {
    return await $getPostApi(id, {
      request,
    });
  }

  /**
   * @description 포스트 작성하기
   * @param {FormFieldValues} input
   * @param {Request} request
   */
  async create(input: FormFieldValues, request: Request) {
    return await $createPostApi(input, {
      request,
    });
  }

  /**
   * @description 포스트 삭제하기
   * @param {string | number} id
   * @param {Request} request
   */
  async delete(id: string | number, request: Request) {
    return await $deletePostApi(id, {
      request,
    });
  }

  /**
   * @description 초안 게시물 작성하기
   * @param {Request} request
   */
  async createDraft(request: Request) {
    try {
      const response = await this.create(
        { title: "Untitled", isDraft: true },
        request
      );
      const result =
        await this.$server.toJSON<FetchRespSchema.DataIDResp>(response);
      if (result.resultCode !== RESULT_CODE.OK) {
        return null;
      }
      return result.result;
    } catch (error) {
      const error_body = this.$server.readBodyError(error);
      if (error_body) {
        return error_body;
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        return error_fetch;
      }

      return null;
    }
  }

  /**
   * @description 게시물 삭제하기
   * @param {string | number} id
   * @param {Request} request
   */
  async deleteItem(id: string | number, request: Request) {
    try {
      const response = await this.delete(id, request);
      const result = await this.$server.toJSON(response);
      if (result.resultCode !== RESULT_CODE.OK) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * @description 포스트 작성하기 (action, loader)
   * @param {Request} request
   */
  async createItem(request: Request) {
    try {
      const formData = await this.$server.readFormData(request);
      const bodyString = formData.get("body")?.toString();
      if (!bodyString) {
        throw new TypeError(
          "body is not defined. please check your request body."
        );
      }
      const input = await $createSchema.parseAsync(Json.parse(bodyString));
      return await this.create(input, request);
    } catch (error) {
      const error_body = this.$server.readBodyError(error);
      if (error_body) {
        return error_body;
      }

      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        return error_validation;
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        return error_fetch;
      }

      return null;
    }
  }

  /**
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (상세)
   * @param {string | number} id
   * @param {Request} request
   */
  async getPost(id: string | number, request: Request) {
    try {
      const response = await this.get(id, request);
      const json =
        await this.$server.toJSON<FetchRespSchema.PostDetailResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return null;
      }
      return json.result;
    } catch (error) {
      return null;
    }
  }

  /**
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {FetchQuerySchema.PostList} params
   * @param {Request} request
   */
  async getPostsByBaseList(
    params: FetchQuerySchema.PostList,
    request: Request
  ) {
    try {
      const response = await this.list(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostListResp>(response);
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
   * @description loader에서 호출 할 때 사용하는 함수 (초안작성여부)
   * @param {Request} request
   */
  async getPostsByDraftList(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      const response = await this.draftList(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostListResp>(response);
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
   * @description loader에서 호출 할 때 사용하는 함수 (삭제여부)
   * @param {Request} request
   */
  async getPostsByDeleteList(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      const response = await this.deleteList(params, request);
      const json =
        await FetchService.toJson<FetchRespSchema.PostListResp>(response);
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
        await FetchService.toJson<FetchRespSchema.PostLikeListResp>(response);
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
        await FetchService.toJson<FetchRespSchema.GetTopPostsResp>(response);
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

  /**
   * @version 2023-08-17
   * @description 기본 포스트 리스트
   */
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
