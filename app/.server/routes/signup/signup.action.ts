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
import { ErrorType, ResponseError } from "~/services/error";
import { getValidatedFormData } from "~/utils/utils";
import { json } from "@remix-run/cloudflare";
import { FieldErrors } from "react-hook-form";

export const signupAction = async ({
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
    const response = await context.api.signupHandler(
      omit(data, ["confirmPassword"]),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // @ts-expect-error - response type is not defined
    const cookie = response.headers?.["set-cookie"];
    const token = getTokenFromCookie(cookie);
    if (!token) {
      return json({
        status: "error" as const,
        result: null,
        errors: {
          username: {
            message: "회원가입에 실패했습니다. 다시 시도해주세요.",
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
      const data = typesafeError.getErrorData();
      const response = await data.response.json<FetchRespSchema.Error>();
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
        username: {
          message: "회원가입에 실패했습니다. 다시 시도해주세요.",
        },
      } as FieldErrors<FormFieldValues>,
      message: null,
    });
  }
};

export type RoutesActionData = typeof signupAction;
