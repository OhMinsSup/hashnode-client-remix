import {
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  json,
} from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import { schema } from "~/services/validate/cf-file.validate";
import { SearchParams, readHeaderCookie } from "~/.server/utils/request.server";
import { parse } from "@conform-to/zod";
import { type FetchResponse } from "~/services/api/fetch/types";

type Data = FetchRespSchema.File;

type DataSchema = FetchRespSchema.Success<Data>;

type CfDirectSchema = CloudflareSchema.CfDirectUpload;

type CfUploadSchema = CloudflareSchema.CfUpload;

type ActionSchema = {
  status: "success" | "error";
  result: Data | null;
  errors: Record<string, string | string[]> | null;
};

type OverrideFetchResponse<T> = FetchResponse<T> & {
  _data: T;
};

function invariantCloudflareResponse(
  response: FetchResponse<CfDirectSchema | CfUploadSchema>
): asserts response is OverrideFetchResponse<CfDirectSchema | CfUploadSchema> {
  if (!response._data) {
    const error = new Error();
    error.name = "CloudflareResponseError";
    error.message = JSON.stringify({
      status: response.status,
      errors: undefined,
    });
    throw error;
  }

  if (!response._data.success) {
    const error = new Error();
    error.name = "CloudflareResponseError";
    error.message = JSON.stringify({
      status: response.status,
      errors: response._data.errors.at(0),
    });
    throw error;
  }
}

export const action = async ({ request, context }: ActionFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  const defaultValue: ActionSchema = {
    status: "error" as const,
    result: null,
    errors: null,
  };

  const cookie = readHeaderCookie(request);
  if (!cookie) {
    return json(
      {
        status: "error" as const,
        result: defaultValue,
        message: "You are not logged in.",
      },
      {
        status: 401,
      }
    );
  }

  const fileApi = context.agent.api.app.file;

  const MAX_FILE_SIZE = 5_000_000; // 5MB
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: MAX_FILE_SIZE,
  });

  const formData = await parseMultipartFormData(request, uploadHandler);

  const submission = parse(formData, {
    schema,
  });

  if (Object.keys(submission.error).length || !submission.value) {
    return json(
      {
        status: "error" as const,
        result: null,
        errors: submission.error,
      } as ActionSchema,
      { status: 400 }
    );
  }

  try {
    // const formData = new FormData();
    // // Now + 2 minutes (2021-01-02T02:20:00Z)
    // const expiry = new Date(Date.now() + 120000).toISOString();
    // formData.append("expiry", expiry);
    const responseTypeCfDirect =
      await fileApi.postDirectUploadHandler<CfDirectSchema>(
        context.env.CF_ID,
        context.env.CF_API_TOKEN
      );
    invariantCloudflareResponse(responseTypeCfDirect);

    const { uploadURL } = responseTypeCfDirect._data.result;

    const responseTypeCfUpload = await fileApi.postCloudflareUploadHandler(
      uploadURL,
      submission.value.file
    );

    const { id, variants } = responseTypeCfUpload.result;

    const response = await fileApi.postFileCreateHandler<DataSchema>({
      body: {
        cfId: id,
        filename: submission.value.file.name,
        mimeType: submission.value.file.type,
        publicUrl: variants[0],
        mediaType: submission.value.mediaType,
        uploadType: submission.value.uploadType,
      },
      headers: {
        Cookie: cookie,
      },
    });

    const data = response._data;
    if (!data) {
      return json(defaultValue, {
        status: response.status,
      });
    }

    return json(
      {
        status: "success" as const,
        result: data.result,
        errors: null,
      } as ActionSchema,
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.name === "CloudflareResponseError") {
      const data = JSON.parse(error.message) as {
        status: number;
        errors: ActionSchema["errors"];
      };
      return json(
        {
          status: "error" as const,
          result: null,
          errors: data.errors,
        } as ActionSchema,
        {
          status: data.status,
        }
      );
    }

    return json(defaultValue, { status: 500 });
  }
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getBasePath = "/api/v1/assets/upload";

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `${getBasePath}?${query}`;
    }
  }
  return getBasePath;
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
