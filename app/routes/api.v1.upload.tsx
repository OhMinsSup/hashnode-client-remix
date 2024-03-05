import {
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
} from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { requireAuthCookie } from "~/server/auth.server";
import { parseWithZod } from "@conform-to/zod";
import { schema } from "~/services/validate/cf-file.validate";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  const MAX_FILE_SIZE = 5_000_000; // 5MB
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: MAX_FILE_SIZE,
  });

  const formData = await parseMultipartFormData(request, uploadHandler);

  const submission = parseWithZod(formData, { schema });

  // Report the submission to client if it is not successful
  if (submission.status !== "success") {
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }

  let uploadURL: string | undefined;
  try {
    const { body, status } = await context.api.postDirectUploadHandler(
      context.env.CF_ID,
      context.env.CF_API_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: Awaited<FetchRespSchema.CfDirectUploadResp> = await body;
    if (!data.success) {
      return json(
        {
          status: "error",
          result: submission.reply(),
          cloudflareErrors: data.errors,
        },
        {
          status,
        }
      );
    }

    uploadURL = data.result.uploadURL;
  } catch (error) {
    console.error(error);
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  if (!uploadURL) {
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  const file = submission.value.file;
  const mediaType = submission.value.mediaType;
  const uploadType = submission.value.uploadType;

  let cfData: FetchRespSchema.CfUploadResp["result"] | undefined;
  try {
    const { body, status } = await context.api.postCloudflareUploadHandler(
      uploadURL,
      file,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: Awaited<FetchRespSchema.CfUploadResp> = await body;
    if (!data.success) {
      return json(
        {
          status: "error",
          result: submission.reply(),
          cloudflareErrors: data.errors,
        },
        {
          status,
        }
      );
    }
    cfData = data.result;
  } catch (error) {
    console.error(error);
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  if (!cfData) {
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  try {
    const { body, status } = await context.api.postFileHandler({
      cfId: cfData.id,
      filename: file.name,
      mimeType: file.type,
      publicUrl: cfData.variants[0],
      mediaType: mediaType as FetchSchema.MediaType,
      uploadType: uploadType as FetchSchema.UploadType,
    });

    const data: Awaited<FetchRespSchema.FileResp> = await body;
    return json(
      {
        status: "success",
        result: data,
        cloudflareErrors: [],
      },
      {
        status,
      }
    );
  } catch (error) {
    console.error(error);
    return json(
      {
        status: "error",
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (redirectUrl: string) =>
  "/api/v1/upload?redirectUrl=" + redirectUrl;

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
