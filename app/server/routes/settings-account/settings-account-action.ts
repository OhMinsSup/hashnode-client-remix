import { redirect, type ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import {
  readHeaderCookie,
  validateMethods,
} from "~/server/utils/request.server";
import { ErrorType, ResponseError } from "~/services/error";

export const settingsAccountAction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["DELETE"], PAGE_ENDPOINTS.ROOT);

  try {
    const cookie = readHeaderCookie(request);

    const response = await context.api.deleteMeHandler({
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
    });

    const body: Awaited<FetchRespSchema.Success> = await response.body;
    if (body.resultCode !== RESULT_CODE.OK) {
      return json(
        {
          status: "error" as const,
          result: "회원탈퇴에 실패했습니다. 다시 시도해주세요.",
        },
        {
          status: 400,
        }
      );
    }

    return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
      headers: {
        "Set-Cookie":
          "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    });
  } catch (e) {
    if (e instanceof Error && e.name === ErrorType.ResponseError) {
      const typesafeError = e as ResponseError;
      const data = typesafeError.getErrorData();
      // const response = await data.response.json<FetchRespSchema.Error>();
      return json(
        {
          status: "error" as const,
          result: "회원탈퇴에 실패했습니다. 다시 시도해주세요.",
        },
        {
          status: data.response.status,
        }
      );
    }

    return json(
      {
        status: "error" as const,
        result: "회원탈퇴에 실패했습니다. 다시 시도해주세요.",
      },
      {
        status: 500,
      }
    );
  }
};

export type RoutesActionData = typeof settingsAccountAction;
