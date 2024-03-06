import {
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
} from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { requireAuthCookie } from "~/server/auth.server";
import { parseWithZod } from "@conform-to/zod";
import { schema } from "~/services/validate/cf-file.validate";
import { readHeaderCookie } from "~/server/utils/request.server";

type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

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
        status: "error" as const,
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }

  let uploadURL: string | undefined;
  try {
    const formData = new FormData();
    // Now + 2 minutes (2021-01-02T02:20:00Z)
    const expiry = new Date(Date.now() + 120000).toISOString();
    formData.append("expiry", expiry);

    const { body, status } = await context.api.postDirectUploadHandler(
      context.env.CF_ID,
      context.env.CF_API_TOKEN
    );

    const data: Awaited<FetchRespSchema.CfDirectUploadResp> = await body;
    if (!data.success) {
      return json(
        {
          status: "error" as const,
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
        status: "error" as const,
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  if (!uploadURL) {
    return json(
      {
        status: "error" as const,
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
      file
    );

    const data: Awaited<FetchRespSchema.CfUploadResp> = await body;
    if (!data.success) {
      return json(
        {
          status: "error" as const,
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
    console.log("cloudflareUpload error:");
    console.error(error);
    return json(
      {
        status: "error" as const,
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  if (!cfData) {
    return json(
      {
        status: "error" as const,
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }

  try {
    const cookie = readHeaderCookie(request);

    const { body, status } = await context.api.postFileHandler(
      {
        cfId: cfData.id,
        filename: file.name,
        mimeType: file.type,
        publicUrl: cfData.variants[0],
        mediaType: mediaType as FetchSchema.MediaType,
        uploadType: uploadType as FetchSchema.UploadType,
      },
      {
        headers: {
          Cookie: cookie,
          "Content-Type": "application/json",
        },
      }
    );

    const data: Awaited<FetchRespSchema.Success<FetchRespSchema.FileResp>> =
      await body;
    if (data.resultCode !== RESULT_CODE.OK) {
      return json(
        {
          status: "error" as const,
          result: submission.reply(),
          cloudflareErrors: [],
        },
        {
          status,
        }
      );
    }
    return json(
      {
        status: "success" as const,
        result: data.result,
        cloudflareErrors: [],
      },
      {
        status,
      }
    );
  } catch (error) {
    console.log("postFile error:");
    console.error(error);
    return json(
      {
        status: "error" as const,
        result: submission.reply(),
        cloudflareErrors: [],
      },
      { status: 500 }
    );
  }
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `/api/v1/upload?${query}`;
    }
  }
  return "/api/v1/upload";
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
