import Json from "superjson";
import { getPostApi } from "~/api/posts/post.server";
import { getPostListApi } from "~/api/posts/posts.server";
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import { isString } from "~/utils/assertion";
import { redirect } from "@remix-run/cloudflare";
import { updatePostApi } from "~/api/posts/update.server";
import { updatePostSchema } from "~/api/posts/validation/update";
import { createPostApi } from "~/api/posts/create.server";
import { createPostSchema } from "~/api/posts/validation/create";
import { getLikePostListApi } from "~/api/posts/like-posts.server";
import { getUserPostListApi } from "~/api/user/user-posts.server";
import { getMyPostListApi } from "~/api/posts/my-posts.server";
import { deletePostApi } from "~/api/posts/delete.server";
import { getTopPostsApi } from "~/api/posts/top-posts.server";

// utils
import { parseUrlParams } from "~/utils/util";

// types
import type { Env } from "../env";
import type { GetPostListApiSearchParams } from "~/api/posts/posts.server";
import type { GetLikePostListApiSearchParams } from "~/api/posts/like-posts.server";
import type { GetUserPostListApiSearchParams } from "~/api/user/user-posts.server";
import type { GetMyPostListApiSearchParams } from "~/api/posts/my-posts.server";
import type { GetTopPostsApiSearchParams } from "~/api/posts/top-posts.server";

export class ItemApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 좋아요 아이템 리스트
   * @param {Request} request
   * @param {GetPostListApiSearchParams?} query
   * @returns {Promise<ReturnType<typeof getPostListApi>>}
   */
  async getLikeItems(
    request: Request,
    query?: GetLikePostListApiSearchParams
  ): Promise<ReturnType<typeof getPostListApi>> {
    return await getLikePostListApi(query, {
      request,
    });
  }

  /**
   * @description 아이템 리스트
   * @param {Request} request
   * @param {GetMyPostListApiSearchParams?} query
   * @returns {Promise<ReturnType<typeof getMyPostListApi>>}
   */
  async getMyItems(
    request: Request,
    query?: GetMyPostListApiSearchParams
  ): Promise<ReturnType<typeof getMyPostListApi>> {
    return await getMyPostListApi(query, {
      request,
    });
  }

  /**
   * @description 아이템 리스트
   * @param {Request} request
   * @param {string} username
   * @param {GetUserPostListApiSearchParams?} query
   * @returns {Promise<ReturnType<typeof getUserPostListApi>>}
   */
  async getUserItems(
    request: Request,
    username: string,
    query?: GetUserPostListApiSearchParams
  ): Promise<ReturnType<typeof getPostListApi>> {
    if (!username) {
      throw new Response("Not Found", { status: 404 });
    }
    return await getUserPostListApi(username, query, {
      request,
    });
  }

  /**
   * @description 아이템 리스트
   * @param {Request} request
   * @param {GetPostListApiSearchParams?} query
   * @returns {Promise<ReturnType<typeof getPostListApi>>}
   */
  async getItems(
    request: Request,
    query?: GetPostListApiSearchParams
  ): Promise<ReturnType<typeof getPostListApi>> {
    return await getPostListApi(query, {
      request,
    });
  }

  /**
   * @description 탑 포스트 가져오기
   * @param {Request} request
   * @param {GetTopPostsApiSearchParams?} query
   */
  async getTopPosts(request: Request, query?: GetTopPostsApiSearchParams) {
    return await getTopPostsApi(query, {
      request,
    });
  }

  /**
   * @description 아이템 상세
   * @param {number | string} id
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getPostApi>>}
   */
  async getItem(
    id: number | string,
    request: Request
  ): Promise<ReturnType<typeof getPostApi>> {
    // 인티저 영어
    const itemId = isString(id) ? parseInt(id, 10) : id;
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    const resp = await getPostApi(itemId, {
      request,
    });
    if (resp.json?.resultCode !== RESULT_CODE.OK) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    return resp;
  }

  /**
   * @description 아이템 추가
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof createPostApi>>}
   */
  async createItem(
    request: Request
  ): Promise<ReturnType<typeof createPostApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      throw redirect(PAGE_ENDPOINTS.DRAFT.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse(bodyString);
    const input = await createPostSchema.parseAsync(jsonData);
    return await createPostApi(input, {
      request,
    });
  }

  /**
   * @description 아이템 수정
   * @param {number | string} id
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof updatePostApi>>}
   */
  async updateItem(
    id: number | string,
    request: Request
  ): Promise<ReturnType<typeof updatePostApi>> {
    // 인티저 영어
    const itemId = isString(id) ? parseInt(id, 10) : id;
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }

    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      throw redirect(PAGE_ENDPOINTS.DRAFT.ID(id), {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse(bodyString);
    const input = await updatePostSchema.parseAsync(jsonData);
    return await updatePostApi(itemId, input, {
      request,
    });
  }

  // /**
  //  * @description 아이템 수정
  //  * @param {number | string} id
  //  * @param {Request} request
  //  * @returns {Promise<ReturnType<typeof deletePostApi>>}
  //  */
  // async deleteItem(
  //   id: number | string,
  //   request: Request
  // ): Promise<ReturnType<typeof deletePostApi>> {
  //   // 인티저 영어
  //   const itemId = isString(id) ? parseInt(id, 10) : id;
  //   if (isNaN(itemId)) {
  //     throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  //   }
  //   return await deletePostApi(itemId, {
  //     request,
  //   });
  // }

  /**
   * @description 아이템 수정
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof deletePostApi>>}
   */
  async deleteItem(
    request: Request
  ): Promise<ReturnType<typeof deletePostApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    const idString = formData.get("id")?.toString();
    if (!bodyString || !idString) {
      const pathname = new URL(request.url).pathname;
      throw redirect(pathname || PAGE_ENDPOINTS.USERS.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    // 인티저 영어
    const itemId = parseInt(idString, 10);
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    return await deletePostApi(itemId, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (top posts)
   * @param {Request} request
   */
  async getItemsByTopList(request: Request) {
    const params = parseUrlParams(request.url);
    let duration = 7;
    if (params.duration && isNaN(parseInt(params.duration)) === false) {
      duration = parseInt(params.duration);
    }

    try {
      const { json: data } = await this.getTopPosts(request, {
        duration,
      });

      const { result, resultCode } = data;
      if (resultCode !== RESULT_CODE.OK) {
        return {
          posts: [],
        };
      }

      return {
        posts: result.posts,
      };
    } catch (error) {
      return {
        posts: [],
      };
    }
  }

  /**
   * @version 2023-08-17
   * @description loader에서 호출 할 때 사용하는 함수 (좋아요)
   * @param {Request} request
   */
  async getItemsByLikeList(request: Request) {
    const params = parseUrlParams(request.url);
    let cursor = undefined;
    if (params.cursor) {
      cursor = parseInt(params.cursor);
    }
    let limit = 25;
    if (params.limit) {
      limit = parseInt(params.limit);
    }

    try {
      const { json: data } = await this.getLikeItems(request, {
        cursor,
        limit,
      });

      const { result, resultCode } = data;
      if (resultCode !== RESULT_CODE.OK) {
        return this.getDefaultItemList();
      }

      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultItemList();
    }
  }

  /**
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {Request} request
   * @param {string} type
   */
  async getItemsByList(
    request: Request,
    type: "recent" | "featured" | "past" | "personalized" | undefined
  ) {
    const params = parseUrlParams(request.url);
    let cursor: number | undefined = undefined;
    if (params.cursor) {
      cursor = parseInt(params.cursor);
    }
    let limit: number | undefined = undefined;
    if (params.limit) {
      limit = parseInt(params.limit);
    }

    try {
      const { json: data } = await this.getItems(request, {
        cursor,
        limit,
        type,
      });

      const { result, resultCode } = data;
      if (resultCode !== RESULT_CODE.OK) {
        return this.getDefaultItemList();
      }

      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultItemList();
    }
  }

  /**
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }

  private getDefaultItemList() {
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
