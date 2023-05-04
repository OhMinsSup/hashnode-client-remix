import cookies from "cookie";
import { getMeApi } from "~/api/user/me.server";
import { logoutApi } from "~/api/user/logout.server";
import { clearCookie } from "./cookie.server";

import { HTTPError } from "~/api/client.next";

import type { LoaderArgs } from "@remix-run/cloudflare";
import type { UserRespSchema } from "~/api/schema/resp";

interface GetSessionApiParams extends LoaderArgs {}

interface GetSessionApiResponse {
  type: "none" | "session" | "unauthenticated" | "error";
  session: UserRespSchema | undefined;
  header: Headers | undefined;
}

/**
 * @description 유저 세션을 가져옵니다.
 * @param {GetSessionApiParams} args
 */
export async function getSessionApi(
  args: GetSessionApiParams
): Promise<GetSessionApiResponse> {
  const { request } = args;
  const cookie = request.headers.get("cookie") ?? null;
  if (!cookie) {
    return {
      type: "none" as const,
      session: undefined,
      header: undefined,
    };
  }
  const { access_token } = cookies.parse(cookie);
  if (!access_token) {
    return {
      type: "none" as const,
      session: undefined,
      header: undefined,
    };
  }
  try {
    const { json } = await getMeApi({
      loaderArgs: args,
    });
    return {
      type: "session" as const,
      session: json.result,
      header: undefined,
    };
  } catch (error) {
    if (
      error instanceof HTTPError &&
      [403, 401].includes(error.response.status)
    ) {
      try {
        await logoutApi({
          loaderArgs: args,
        }).catch((e) => null);
        return {
          type: "unauthenticated" as const,
          session: undefined,
          header: clearCookie(request.headers, "access_token"),
        };
      } catch (error) {
        return {
          type: "error" as const,
          session: undefined,
          header: undefined,
        };
      }
    }
    return {
      type: "error" as const,
      session: undefined,
      header: undefined,
    };
  }
}
