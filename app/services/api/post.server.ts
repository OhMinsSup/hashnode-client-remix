import Json from "superjson";

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
import { schema as $idSchema } from "~/services/validate/id.validate";
import { safeRedirect } from "remix-utils/safe-redirect";
import { redirect } from "@remix-run/cloudflare";

// utils
import { parseUrlParams } from "~/utils/util";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";
import type { ToastService } from "~/services/app/toast.server";

export class PostApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService,
    private readonly $toast: ToastService
  ) {}

  /**
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
   * @description 포스트 수정
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
   * @description 포스트 삭제하기
   * @param {string | number} id
   * @param {Request} request
   */
  async delete(id: string | number, request: Request) {
    return await $deletePostApi(id, {
      request,
    });
  }

  async createDraftForRedirectOrWrite(request: Request) {
    const { list } = await this.getDraftPosts(request);
    const item = list.at(0);
    if (item) {
      throw redirect(safeRedirect(PAGE_ENDPOINTS.WRITE.ID(item.id)));
    }
    await this.createDraftForRedirect(request);
  }

  async createDraftForRedirect(request: Request) {
    const { dataId } = await this.createDraft(request);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.WRITE.ID(dataId)));
  }

  /**
   * @description 초안 게시물 작성하기
   * @param {Request} request
   */
  async createDraft(request: Request) {
    const defaultToastOpts = {
      title: "error",
      description: "failed to follow the draft post. Please try again later.",
      type: "error" as const,
    };

    try {
      const response = await this.create(
        { title: "Untitled", isDraft: true },
        request
      );
      const result =
        await this.$server.toJSON<FetchRespSchema.DataIDResp>(response);
      if (result.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "CreateDraftError";
        error.message = defaultToastOpts.description;
        throw error;
      }
      return result.result;
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        safeRedirect(PAGE_ENDPOINTS.ROOT),
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
    }
  }

  /**
   * @description 게시물 삭제하기
   * @param {string | number} id
   * @param {Request} request
   */
  async deleteDraft(request: Request) {
    const defaultToastOpts = {
      title: "error",
      description: "failed to delete the post. Please try again later.",
      type: "error" as const,
    };

    const formData = await request.formData();
    const body = {
      id: formData.get("id")?.toString(),
    };

    try {
      const input = await $idSchema.parseAsync(body);
      const response = await this.delete(input.id, request);
      const result = await this.$server.toJSON(response);
      if (result.resultCode !== RESULT_CODE.OK) {
        const error = new Error();
        error.name = "DeletePostError";
        error.message = defaultToastOpts.description;
        throw error;
      }
      return result.result;
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.ROOT),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          // @ts-ignore
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(body.id)),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      throw await this.$server.redirectWithToast(
        // @ts-ignore
        safeRedirect(PAGE_ENDPOINTS.WRITE.ID(body.id)),
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
    }
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
      console.log("id is not defined.");
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
        console.log("body is not defined.");
        throw new TypeError(
          "body is not defined. please check your request body."
        );
      }
      const input = await $createSchema.parseAsync(Json.parse(bodyString));
      const response = await this.update(id, input, request);
      const json = await this.$server.toJSON(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        console.log("failed to update the post.");
        const error = new Error();
        error.name = "UpdatePostError";
        error.message = "failed to follow the tag. Please try again later.";
        throw error;
      }
      throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
    } catch (error) {
      const error_validation = this.$server.readValidateError(error);
      if (error_validation) {
        console.log("validate = failed to update the post.", error_validation);
        throw await this.$server.redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        console.log("fetch = failed to update the post.", error_fetch);
        throw await this.$server.redirectWithToast(
          // @ts-ignore
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          defaultToastOpts,
          this.$toast.createToastHeaders
        );
      }

      console.log("errro = failed to update the post.", error);

      throw await this.$server.redirectWithToast(
        // @ts-ignore
        safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
        defaultToastOpts,
        this.$toast.createToastHeaders
      );
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
  async getPosts(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getBasePosts(params, request);
  }

  /**
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
}
