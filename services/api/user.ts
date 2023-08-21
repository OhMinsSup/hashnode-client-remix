import Json from "superjson";
import { redirect } from "@remix-run/cloudflare";

import { getUserApi } from "~/api/user/user.server";
import { getExploreBlogsApi } from "~/api/user/explore-blogs.server";
import { userUpdateSchema } from "~/api/user/validation/update";
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

import { deleteUserApi as $deleteUserApi } from "services/fetch/users/delete-api.server";
import { putUserApi as $putUserApi } from "services/fetch/users/put-api.server";

import {
  schema as $updateSchema,
  type FormFieldValues,
} from "services/validate/user-update-api.validate";

// types
import type { Env } from "../env";
import type { UserUpdateBody } from "~/api/user/validation/update";
import type { GetExploreBlogsApiSearchParams } from "~/api/user/explore-blogs.server";
import type { ServerService } from "services/app/server";

export class UserApiService {
  constructor(
    private readonly $env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @deprecated
   * @description 유저 정보 수정
   * @param {Request} request
   */
  async updateUser(request: Request) {
    const formData = await this.$server.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      throw redirect(PAGE_ENDPOINTS.SETTINGS.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse<UserUpdateBody>(bodyString);
    const input = await userUpdateSchema.parseAsync(jsonData);
    return await $putUserApi(input, {
      request,
    });
  }

  /**
   * @deprecated
   * @description 유저 회원탈퇴
   * @param {Request} request
   */
  async deleteUser(request: Request) {
    if (request.method !== "DELETE") {
      throw redirect(PAGE_ENDPOINTS.SETTINGS.ACCOUNT, {
        status: STATUS_CODE.METHOD_NOT_ALLOED,
      });
    }
    return await $deleteUserApi({
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 수정 API
   * @param {Request} request
   */
  async update(request: Request) {
    const formData = await this.$server.readFormData(request);
    const bodyString = formData.get("body")?.toString() ?? "{}";
    const body = Json.parse<FormFieldValues>(bodyString);
    const input = await $updateSchema.parseAsync(body);
    return $putUserApi(input, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 삭제 API
   * @param {Request} request
   */
  async delete(request: Request) {
    return $deleteUserApi({
      request,
    });
  }

  /**
   * @description 유저 정보
   * @param {Request} request
   * @param {string} username
   * @returns {Promise<ReturnType<typeof getUserApi>>}
   */
  async getUser(
    request: Request,
    username: string
  ): Promise<ReturnType<typeof getUserApi>> {
    if (!username) {
      throw new Response("Not Found", { status: 404 });
    }
    const resp = await getUserApi(username, {
      request: request,
    });
    if (resp.json?.resultCode !== RESULT_CODE.OK) {
      throw new Response("Not Found", { status: 404 });
    }
    return resp;
  }

  async getExploreBlogs(
    request: Request,
    query?: GetExploreBlogsApiSearchParams
  ) {
    return await getExploreBlogsApi(query, {
      request,
    });
  }

  /**
   * @version 2023-08-17
   * @description 유저 탈퇴
   * @param {Request} request
   */
  async deleteByUser(request: Request) {
    this.$server.readValidateMethod(
      request,
      "DELETE",
      PAGE_ENDPOINTS.SETTINGS.ROOT
    );

    try {
      await this.delete(request);

      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: this.$server.getClearAuthHeaders(),
      });
    } catch (error) {
      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        return error_fetch;
      }

      return null;
    }
  }

  /**
   * @version 2023-08-17
   * @description 유저 수정
   * @param {Request} request
   */
  async updateByUser(request: Request) {
    try {
      await this.update(request);

      return redirect(PAGE_ENDPOINTS.SETTINGS.ROOT);
    } catch (error) {
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
}
