import { redirect, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import {
  getTokenFromCookie,
  validateMethods,
} from "~/.server/utils/request.server";
import {
  FormFieldValues,
  resolver,
} from "~/services/validate/signin-api.validate";
import { getValidatedFormData } from "~/services/libs";
import { json } from "@remix-run/cloudflare";
import { type FieldErrors } from "react-hook-form";
import {
  createToastHeaders,
  redirectWithToast,
} from "~/.server/utils/toast.server";
import { IFetchError } from "~/services/api/fetch/types";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["POST"], PAGE_ENDPOINTS.AUTH.SIGNIN);

  const { errors, data } = await getValidatedFormData<FormFieldValues>(
    request,
    resolver
  );

  if (errors) {
    return json({
      status: "error" as const,
      result: null,
      errors,
      message: null,
    });
  }

  try {
    const response = await context.agent.api.app.auth.signinHandler({
      body: data,
    });
    const cookie = response.headers.get("set-cookie");
    const token = cookie ? getTokenFromCookie(cookie) : null;
    if (!token || !cookie) {
      return redirectWithToast(
        PAGE_ENDPOINTS.AUTH.SIGNIN,
        {
          type: "error",
          description: "로그인에 실패했습니다. 다시 시도해주세요.",
        },
        createToastHeaders
      );
    }

    return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (e) {
    if (e instanceof Error && e.name === "FetchError") {
      const error = e as IFetchError<FetchRespSchema.Error>;
      if (error.data) {
        const isNotExistsUser = error.data.resultCode === RESULT_CODE.NOT_EXIST;
        if (isNotExistsUser) {
          return redirect(
            safeRedirect(`${PAGE_ENDPOINTS.AUTH.SIGNUP}?email=${data.email}`)
          );
        }
        return json({
          status: "error" as const,
          result: null,
          errors: {
            [error.data.error]: {
              message: error.data.message,
            },
          } as FieldErrors<FormFieldValues>,
          message: null,
        });
      }
    }
    return redirectWithToast(
      safeRedirect(PAGE_ENDPOINTS.AUTH.SIGNIN),
      {
        type: "error",
        description: "로그인에 실패했습니다. 다시 시도해주세요.",
      },
      createToastHeaders
    );
  }
};

export type RoutesActionData = typeof action;
