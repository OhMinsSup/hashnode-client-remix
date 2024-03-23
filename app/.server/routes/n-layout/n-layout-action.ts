import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import {
  readHeaderCookie,
  validateMethods,
} from "~/.server/utils/request.server";
import { ErrorType, ResponseError } from "~/services/error";
import { schema } from "~/services/validate/tag-follow-api.validate";

export const nLayoutAction = async ({
  context,
  request,
}: ActionFunctionArgs) => {
  // 유효성 검사
  validateMethods(request, ["POST"], PAGE_ENDPOINTS.ROOT);

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema });

  // Report the submission to client if it is not successful
  if (submission.status !== "success") {
    return json(
      {
        status: "error" as const,
        submission,
      },
      {
        status: STATUS_CODE.BAD_REQUEST,
      }
    );
  }

  try {
    const cookie = readHeaderCookie(request);

    const response = await context.api.postTagFollowHandler(submission.value, {
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
    });

    const body: Awaited<FetchRespSchema.Success> = await response.body;
    if (body.resultCode !== RESULT_CODE.OK) {
      return json({
        status: "error" as const,
        submission: submission.reply({
          formErrors: ["태그 팔로우에 실패했습니다. 다시 시도해주세요."],
        }),
      });
    }

    return json({
      status: "success" as const,
    });
  } catch (e) {
    if (e instanceof Error && e.name === ErrorType.ResponseError) {
      const typesafeError = e as ResponseError;
      const data = typesafeError.getErrorData();
      const response = await data.response.json<FetchRespSchema.Error>();

      return json(
        {
          status: "error" as const,
          error: e,
          submission: submission.reply({
            fieldErrors: {
              [response.error]: [response.message],
            },
          }),
        },
        {
          status: data.response.status,
        }
      );
    }
    return json(
      {
        status: "error" as const,
        error: e,
        submission: submission.reply({
          formErrors: ["태그 팔로우에 실패했습니다. 다시 시도해주세요."],
        }),
      },
      {
        status: STATUS_CODE.SERVER_ERROR,
      }
    );
  }
};

export type RoutesActionData = typeof nLayoutAction;
