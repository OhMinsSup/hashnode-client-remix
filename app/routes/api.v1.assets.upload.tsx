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
import { SearchParams } from "~/.server/utils/request.server";
import { parse } from "@conform-to/zod";

type Data = FetchRespSchema.File;

type DataSchema = FetchRespSchema.Success<Data>;

type ActionSchema = {
  status: "success" | "error";
  result: Data | null;
  errors: Record<string, string | string[]> | null;
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  const defaultValue: ActionSchema = {
    status: "error" as const,
    result: null,
    errors: null,
  };

  const MAX_FILE_SIZE = 5_000_000; // 5MB
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: MAX_FILE_SIZE,
  });

  const formData = await parseMultipartFormData(request, uploadHandler);

  const submission = parse(formData, {
    schema,
  });

  if (submission.error || !submission.value) {
    return json(
      {
        status: "error" as const,
        result: null,
        errors: submission.error,
      } as ActionSchema,
      { status: 400 }
    );
  }

  let uploadURL: string | undefined;
  try {
    const formData = new FormData();
    // Now + 2 minutes (2021-01-02T02:20:00Z)
    const expiry = new Date(Date.now() + 120000).toISOString();
    formData.append("expiry", expiry);

    const response =
      await context.agent.api.app.file.postDirectUploadHandler<CloudflareSchema.CfDirectUpload>(
        context.env.CF_ID,
        context.env.CF_API_TOKEN
      );

    const data = response._data;
    if (!data) {
      return json(defaultValue, {
        status: response.status,
      });
    }

    if (!data.success) {
      return json(
        {
          status: "error" as const,
          result: null,
          errors: data.errors.at(0) ?? null,
        } as ActionSchema,
        {
          status: response.status,
        }
      );
    }

    uploadURL = data.result.uploadURL;
  } catch (error) {
    console.error(error);
    return json(defaultValue, { status: 500 });
  }

  if (!uploadURL) {
    return json(defaultValue, { status: 500 });
  }

  const { file, mediaType, uploadType } = submission.value;

  let cfData: CloudflareSchema.CfUpload["result"] | undefined;
  try {
    const response =
      await context.agent.api.app.file.postCloudflareUploadHandler<CloudflareSchema.CfUpload>(
        uploadURL,
        file
      );

    const data = response._data;
    if (!data) {
      return json(defaultValue, {
        status: response.status,
      });
    }

    if (!data.success) {
      return json(
        {
          status: "error" as const,
          result: null,
          errors: data.errors.at(0) ?? null,
        } as ActionSchema,
        {
          status: response.status,
        }
      );
    }

    cfData = data.result;
  } catch (error) {
    return json(defaultValue, { status: 500 });
  }

  if (!cfData) {
    return json(defaultValue, { status: 500 });
  }

  try {
    const response =
      await context.agent.api.app.file.postFileCreateHandler<DataSchema>({
        body: {
          cfId: cfData.id,
          filename: file.name,
          mimeType: file.type,
          publicUrl: cfData.variants[0],
          mediaType: mediaType,
          uploadType: uploadType,
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
