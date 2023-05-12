import { json, redirect } from "@remix-run/cloudflare";
import cookies from "cookie";
import { logoutApi } from "~/api/user/logout.server";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async (args: ActionArgs) => {
  try {
    const { request } = args;
    const cookie = request.headers.get("cookie") ?? null;
    if (!cookie) {
      return json(
        {
          ok: false,
          respData: null,
        },
        {
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }
    const { access_token } = cookies.parse(cookie);
    if (!access_token) {
      return json(
        {
          ok: false,
          respData: null,
        },
        {
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }
    const { json: data, header } = await logoutApi({
      actionArgs: args,
    });
    if (data.resultCode === RESULT_CODE.OK) {
      return redirect(PAGE_ENDPOINTS.ROOT, {
        headers: header,
      });
    } else {
      return json({
        ok: false,
        respData: data,
      });
    }
  } catch (error) {
    return json({
      ok: false,
      respData: null,
    });
  }
};
