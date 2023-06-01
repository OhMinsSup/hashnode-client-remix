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

// types
import type { Env } from "../env";
import type { GetPostListApiSearchParams } from "~/api/posts/posts.server";
import type { GetLikePostListApiSearchParams } from "~/api/posts/like-posts.server";
import type { GetUserPostListApiSearchParams } from "~/api/user/user-posts.server";

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

  /**
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }
}
