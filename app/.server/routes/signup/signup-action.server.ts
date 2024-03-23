import omit from "lodash-es/omit";
import { redirect, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseWithZod } from "@conform-to/zod";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import {
  getTokenFromCookie,
  validateMethods,
} from "~/.server/utils/request.server";
import { schema as $signupSchema } from "~/services/validate/signup-api.validate";
import { ErrorType, ResponseError } from "~/services/error";

export const signupAction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["POST"], PAGE_ENDPOINTS.ROOT);

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: $signupSchema });

  // Report the submission to client if it is not successful
  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const response = await context.api.signupHandler(
      omit(submission.value, ["confirmPassword"]),
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
      return submission.reply({
        formErrors: ["회원가입에 실패했습니다. 다시 시도해주세요."],
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
      return submission.reply({
        fieldErrors: {
          [response.error]: [response.message],
        },
      });
    }
    return submission.reply({
      formErrors: ["회원가입에 실패했습니다. 다시 시도해주세요."],
    });
  }
};

export type RoutesActionData = typeof signupAction;
