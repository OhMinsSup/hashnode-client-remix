import Json from "superjson";
import { getDraftListApi } from "~/api/draft/drafts.server";
import { getDraftApi } from "~/api/draft/draft.server";
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import { isString } from "~/utils/assertion";
import { redirect } from "@remix-run/cloudflare";
import { updateDraftApi } from "~/api/draft/update.server";
import { createDraftApi } from "~/api/draft/create.server";
import { deleteDraftApi } from "~/api/draft/delete.server";

// types
import type { Env } from "../env";
import { draftSchema } from "~/api/draft/validation/draft";

export class DraftApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 아이템 리스트
   * @param {Request} request
   * @param {GetPostListApiSearchParams?} query
   * @returns {Promise<ReturnType<typeof getPostListApi>>}
   */
  async getDrafts(
    request: Request,
    query?: Parameters<typeof getDraftListApi>[0]
  ): Promise<ReturnType<typeof getDraftListApi>> {
    return await getDraftListApi(query, {
      request,
    });
  }

  /**
   * @description 아이템 상세
   * @param {number | string} id
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getPostApi>>}
   */
  async getDraft(
    id: number | string,
    request: Request
  ): Promise<ReturnType<typeof getDraftApi>> {
    // 인티저 영어
    const itemId = isString(id) ? parseInt(id, 10) : id;
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    const resp = await getDraftApi(itemId, {
      request,
    });
    if (resp.json?.resultCode !== RESULT_CODE.OK) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    return resp;
  }

  // /**
  //  * @description 아이템 상세
  //  * @param {number | string} id
  //  * @param {Request} request
  //  * @returns {Promise<ReturnType<typeof getPostApi>>}
  //  */
  // async deleteDraft(
  //   id: number | string,
  //   request: Request
  // ): Promise<ReturnType<typeof deleteDraftApi>> {
  //   // 인티저 영어
  //   const itemId = isString(id) ? parseInt(id, 10) : id;
  //   if (isNaN(itemId)) {
  //     throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  //   }
  //   const resp = await deleteDraftApi(itemId, {
  //     request,
  //   });
  //   if (resp.json?.resultCode !== RESULT_CODE.OK) {
  //     throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  //   }
  //   return resp;
  // }

  /**
   * @description 아이템 상세
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getPostApi>>}
   */
  async deleteDraft(
    request: Request
  ): Promise<ReturnType<typeof deleteDraftApi>> {
    const formData = await this.readFormData(request);
    const idString = formData.get("id")?.toString();
    if (!idString) {
      const pathname = new URL(request.url).pathname;
      throw redirect(pathname || PAGE_ENDPOINTS.DRAFT.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    // 인티저 영어
    const itemId = parseInt(idString, 10);
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    const resp = await deleteDraftApi(itemId, {
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
   * @returns {Promise<ReturnType<typeof createDraftApi>>}
   */
  async createDraft(
    request: Request
  ): Promise<ReturnType<typeof createDraftApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      console.log("bodyString", bodyString);
      throw redirect(PAGE_ENDPOINTS.DRAFT.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse(bodyString);
    const input = await draftSchema.parseAsync(jsonData);
    return await createDraftApi(input, {
      request,
    });
  }

  // /**
  //  * @description 아이템 수정
  //  * @param {number | string} id
  //  * @param {Request} request
  //  * @returns {Promise<ReturnType<typeof updateDraftApi>>}
  //  */
  // async updateDraft(
  //   id: number | string,
  //   request: Request
  // ): Promise<ReturnType<typeof updateDraftApi>> {
  //   // 인티저 영어
  //   const itemId = isString(id) ? parseInt(id, 10) : id;
  //   if (isNaN(itemId)) {
  //     throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  //   }

  //   const formData = await this.readFormData(request);
  //   const bodyString = formData.get("body")?.toString();
  //   if (!bodyString) {
  //     throw redirect(PAGE_ENDPOINTS.DRAFT.ID(id), {
  //       status: STATUS_CODE.BAD_REQUEST,
  //     });
  //   }
  //   const jsonData = Json.parse(bodyString);
  //   const input = await draftSchema.parseAsync(jsonData);
  //   return await updateDraftApi(itemId, input, {
  //     request,
  //   });
  // }
  /**
   * @description 아이템 수정
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof updateDraftApi>>}
   */
  async updateDraft(
    request: Request
  ): Promise<ReturnType<typeof updateDraftApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    const idString = formData.get("id")?.toString();
    if (!bodyString || !idString) {
      const pathname = new URL(request.url).pathname;
      throw redirect(pathname || PAGE_ENDPOINTS.DRAFT.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    // 인티저 영어
    const itemId = parseInt(idString, 10);
    if (isNaN(itemId)) {
      throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
    }
    const jsonData = Json.parse(bodyString);
    const input = await draftSchema.parseAsync(jsonData);
    return await updateDraftApi(itemId, input, {
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
