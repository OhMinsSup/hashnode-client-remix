import Json from "superjson";
import merge from "lodash-es/merge";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { getPostsApi as $getPostsApi } from "~/services/fetch/posts/gets-api.server";
import { getLikePostsApi as $getLikePostsApi } from "~/services/fetch/posts/gets-like-api.server";
import { getTopPostsApi as $getTopPostsApi } from "~/services/fetch/posts/gets-top-api.server";
import { getDraftPostsApi as $getDraftPostsApi } from "~/services/fetch/posts/gets-draft-api.server";
import { createPostApi as $createPostApi } from "~/services/fetch/posts/create-api.server";
import { updatePostApi as $updatePostApi } from "~/services/fetch/posts/update-api.server";
import { getPostApi as $getPostApi } from "~/services/fetch/posts/get-api.server";
import { deletePostApi as $deletePostApi } from "~/services/fetch/posts/delete-api.server";
import { getDeletePostsApi as $getDeletePostsApi } from "~/services/fetch/posts/gets-deleted-api.server";

import { FetchService } from "~/services/fetch/fetch.api";
import { schema as $createSchema } from "~/services/validate/post-create-api.validate";
import { safeRedirect } from "remix-utils/safe-redirect";
import { redirect } from "@remix-run/cloudflare";

// utils
import { parseUrlParams } from "~/utils/util";

// types
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";
import type { HashnodeApiConstructorOptions } from "~/services/types";
import { BaseError, ErrorType } from "../error";

export class PostApiService {
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
   * @description 아이템 리스트
   * @param {FetchQuerySchema.PostList} query
   * @param {Request} request
   */
  async getList(query: FetchQuerySchema.PostList, request: Request) {
    return await $getPostsApi(query, {
      request,
    });
  }

  /**
   * @deprecated
   * @description 좋아요 아이템 리스트
   * @param {FetchQuerySchema.PostList} query
   * @param {Request} request
   */
  async getLikeList(query: FetchQuerySchema.PostList, request: Request) {
    return await $getLikePostsApi(query, {
      request,
    });
  }

  /**
   * @deprecated
   * @description 탑 포스트 가져오기
   * @param {FetchQuerySchema.GetTopPost} query
   * @param {Request} request
   */
  async getTopList(query: FetchQuerySchema.GetTopPost, request: Request) {
    return await $getTopPostsApi(query, {
      request,
    });
  }

  /**
   * @deprecated
   * @description 초안작성 포스트 가져오기
   * @param {FetchQuerySchema.Pagination} query
   * @param {Request} request
   */
  async getDraftList(query: FetchQuerySchema.Pagination, request: Request) {
    return await $getDraftPostsApi(query, {
      request,
    });
  }

  /**
   * @deprecated
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
   * @deprecated
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
   * @deprecated
   * @param {FormFieldValues} input
   * @param {Request} request
   */
  async create(input: FormFieldValues, request: Request) {
    return await $createPostApi(input, {
      request,
    });
  }

  /**
   * @description 포스트 수정
   * @deprecated
   * @param {string | number} id
   * @param {FormFieldValues} input
   * @param {Request} request
   */
  async update(id: string, input: FormFieldValues, request: Request) {
    return await $updatePostApi(id, input, {
      request,
    });
  }

  /**
   * @deprecated
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
   * @description 포스트 수정 (action)
   * @param {Request} request
   * @param {string | undefined} id
   */
  async updateItem(request: Request, id: string | undefined) {
    const defaultToastOpts = {
      title: "error",
      description: "failed to delete the post. Please try again later.",
      type: "error" as const,
    };

    if (!id) {
      throw await this.$server.redirectWithToast(
        safeRedirect(PAGE_ENDPOINTS.ROOT),
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
    }

    try {
      const formData = await this.$server.readFormData(request);
      const bodyString = formData.get("body")?.toString();
      if (!bodyString) {
        throw new TypeError(
          "body is not defined. please check your request body."
        );
      }
      const input = await $createSchema.parseAsync(Json.parse(bodyString));
      const response = await this.update(id, input, request);
      const json = await this.$server.toJSON(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "UpdatePostError";
        error.message = "failed to follow the tag. Please try again later.";
        throw error;
      }
      return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          // @ts-ignore
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        // @ts-ignore
        safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @deprecated
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
   * @deprecated
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {FetchQuerySchema.PostList} params
   * @param {Request} request
   */
  async getBasePosts(params: FetchQuerySchema.PostList, request: Request) {
    try {
      const response = await this.getList(params, request);
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
   * @deprecated
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (초안작성여부)
   * @param {Request} request
   */
  async getDraftPosts(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      const response = await this.getDraftList(params, request);
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
   * @deprecated
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (초안작성여부)
   * @param {Request} request
   */
  async getMainLikePostsLimit4(request: Request) {
    try {
      const response = await this.getLikeList(
        {
          limit: 4,
        },
        request
      );
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
   * @deprecated
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (초안작성여부)
   * @param {Request} request
   */
  async getMainDraftPostsLimit4(request: Request) {
    try {
      const response = await this.getDraftList(
        {
          limit: 4,
        },
        request
      );
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
   * @deprecated
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

  async getDraftPostList(
    request: Request,
    defaultValues?: FetchQuerySchema.PostList
  ) {
    try {
      const params = parseUrlParams(request.url);
      const input = defaultValues ? merge(defaultValues, params) : params;
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getDraftPostListHandler(input, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.PostListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getPostList(
    request: Request,
    defaultValues?: FetchQuerySchema.PostList
  ) {
    try {
      const params = parseUrlParams(request.url);
      const input = defaultValues ? merge(defaultValues, params) : params;
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getPostListHandler(input, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.PostListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getLikePostList(
    request: Request,
    defaultValues?: FetchQuerySchema.PostList
  ) {
    try {
      const params = parseUrlParams(request.url);
      const input = defaultValues ? merge(defaultValues, params) : params;
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getLikePostListHandler(input, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.PostListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getOwnerPostDetail(postId: string, request: Request) {
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

      const response = await this.$agent.getOwnerPostHandler(postId, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        throw redirect(redirectUrl);
      }
      return data.result as FetchRespSchema.PostDetailResp;
    } catch (error) {
      throw redirect(redirectUrl);
    }
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description 태그 리스트 가져오기
   * @param {Request} request
   */
  async getPosts(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getBasePosts(params, request);
  }

  /**
   * @deprecated
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (좋아요)
   * @param {Request} request
   */
  async getLikePosts(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      const response = await this.getLikeList(params, request);
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
   * @deprecated
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (top posts)
   * @param {Request} request
   */
  async getTopPosts(request: Request) {
    try {
      const params = parseUrlParams(request.url);
      let duration = 7;
      if (params.duration && isNaN(parseInt(params.duration)) === false) {
        duration = parseInt(params.duration);
      }

      const response = await this.getTopList(
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
