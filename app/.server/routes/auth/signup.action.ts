import omit from "lodash-es/omit";
import { redirect, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import {
  getTokenFromCookie,
  validateMethods,
} from "~/.server/utils/request.server";
import {
  resolver,
  FormFieldValues,
} from "~/services/validate/signup-api.validate";
import { getValidatedFormData } from "~/services/libs";
import { json } from "@remix-run/cloudflare";
import { FieldErrors } from "react-hook-form";
import {
  createToastHeaders,
  redirectWithToast,
} from "~/.server/utils/toast.server";
import { IFetchError } from "~/services/api/fetch/types";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["POST"], PAGE_ENDPOINTS.AUTH.SIGNUP);

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
    const response = await context.agent.api.app.auth.signupHandler<
      FetchRespSchema.Success<FetchRespSchema.Auth>
    >({
      body: omit(data, ["confirmPassword"]),
    });
    const cookie = response.headers.get("set-cookie");
    const token = cookie ? getTokenFromCookie(cookie) : null;
    if (!token || !cookie) {
      return redirectWithToast(
        PAGE_ENDPOINTS.AUTH.SIGNUP,
        {
          type: "error",
          description: "회원가입에 실패했습니다. 다시 시도해주세요.",
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
    console.error(e);
    if (e instanceof Error && e.name === "FetchError") {
      const error = e as IFetchError<FetchRespSchema.Error>;
      if (error.data) {
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
      safeRedirect(PAGE_ENDPOINTS.AUTH.SIGNUP),
      {
        type: "error",
        description: "회원가입에 실패했습니다. 다시 시도해주세요.",
      },
      createToastHeaders
    );
  }
};

export type RoutesActionData = typeof action;
