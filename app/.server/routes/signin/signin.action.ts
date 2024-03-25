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
import { ErrorType, ResponseError } from "~/services/error";
import { getValidatedFormData } from "~/utils/utils";
import { json } from "@remix-run/cloudflare";
import { type FieldErrors } from "react-hook-form";

export const signinAction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["POST"], PAGE_ENDPOINTS.ROOT);

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
    const response = await context.api.signinHandler(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // @ts-expect-error - response type is not defined
    const cookie = response.headers?.["set-cookie"];
    const token = getTokenFromCookie(cookie);
    if (!token) {
      return json({
        status: "error" as const,
        result: null,
        errors: {
          email: {
            message: "토근을 발급받지 못했습니다. 다시 시도해주세요.",
          },
          password: {
            message: "토근을 발급받지 못했습니다. 다시 시도해주세요.",
          },
        } as FieldErrors<FormFieldValues>,
        message: null,
      });
    }

    return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (e) {
    if (e instanceof Error && e.name === ErrorType.ResponseError) {
      const typesafeError = e as ResponseError;
      const errorData = typesafeError.getErrorData();
      const response = await errorData.response.json<FetchRespSchema.Error>();
      const isNotExistsUser = response.resultCode === RESULT_CODE.NOT_EXIST;
      if (isNotExistsUser) {
        throw redirect(
          safeRedirect(`${PAGE_ENDPOINTS.AUTH.SIGNUP}?email=${data.email}`)
        );
      }

      return json({
        status: "error" as const,
        result: null,
        errors: {
          [response.error]: {
            message: response.message,
          },
        } as FieldErrors<FormFieldValues>,
        message: null,
      });
    }
    return json({
      status: "error" as const,
      result: null,
      errors: {
        email: {
          message: "로그인에 실패했습니다. 다시 시도해주세요.",
        },
        password: {
          message: "로그인에 실패했습니다. 다시 시도해주세요.",
        },
      } as FieldErrors<FormFieldValues>,
      message: null,
    });
  }
};

export type RoutesActionData = typeof signinAction;
