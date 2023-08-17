import cookies from "cookie";
import Json from "superjson";
import { redirect } from "@remix-run/cloudflare";
import { getMeApi } from "~/api/user/me.server";
import { logoutApi } from "~/api/user/logout.server";
import { deleteUserApi } from "~/api/user/delete.server";
import { putUserApi } from "~/api/user/update.server";
import { getUserApi } from "~/api/user/user.server";
import { getExploreBlogsApi } from "~/api/user/explore-blogs.server";
import { userUpdateSchema } from "~/api/user/validation/update";
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import { HTTPError } from "~/api/error";

// types
import type { Env } from "../env";
import type { UserRespSchema } from "~/api/schema/resp";
import type { UserUpdateBody } from "~/api/user/validation/update";
import type { GetExploreBlogsApiSearchParams } from "~/api/user/explore-blogs.server";

export class UserApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 유저 정보 수정
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof putUserApi>>}
   */
  async updateUser(request: Request): Promise<ReturnType<typeof putUserApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      throw redirect(PAGE_ENDPOINTS.SETTINGS.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse<UserUpdateBody>(bodyString);
    const input = await userUpdateSchema.parseAsync(jsonData);
    return await putUserApi(input, {
      request,
    });
  }

  /**
   * @description 유저 회원탈퇴
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof deleteUserApi>>}
   */
  async deleteUser(
    request: Request
  ): Promise<ReturnType<typeof deleteUserApi>> {
    if (request.method !== "DELETE") {
      throw redirect(PAGE_ENDPOINTS.SETTINGS.ACCOUNT, {
        status: STATUS_CODE.METHOD_NOT_ALLOED,
      });
    }
    return await deleteUserApi({
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
   * @deprecated
   * @description 세션 가져오기
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof getMeApi> | null>}
   */
  async getSession(request: Request): Promise<UserRespSchema | null> {
    const cookie =
      request.headers.get("Cookie") ||
      request.headers.get("Set-Cookie") ||
      null;

    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }

    if (!accessToken) {
      return null;
    }

    try {
      const { json } = await getMeApi({ request });
      if (json.resultCode !== RESULT_CODE.OK) {
        return null;
      }

      return json.result;
    } catch (error) {
      if (error instanceof HTTPError) {
        if ([403, 401].includes(error.response.status)) {
          await logoutApi().catch((e) => null);
        }
      }
      return null;
    }
  }

  /**
   * @deprecated
   * @description 로그아웃
   * @param {Request} request
   * @returns {Promise<boolean>}
   */
  async logout(request: Request): Promise<boolean> {
    const cookie =
      request.headers.get("Cookie") ||
      request.headers.get("Set-Cookie") ||
      null;
    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }
    if (!accessToken) {
      return true;
    }
    const { json } = await logoutApi({ request });
    if (json.resultCode !== RESULT_CODE.OK) {
      return false;
    }
    return true;
  }

  /**
   * @deprecated
   * @description 인증 여부
   * @param {Request} request
   * @returns {Promise<boolean>}
   */
  async isAuthenticated(request: Request): Promise<boolean> {
    const session = await this.getSession(request);
    return !!session;
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
