import { z } from "zod";
import {
  json,
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";
import { FetchError } from "services/fetch/fetch.error";
import { schema } from "services/validate/cf-file.validate";
import {
  postCfDirectUploadApi,
  postCfUploadApi,
} from "services/fetch/files/cf-file.server";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

const defaultError = {
  result: null,
  success: false,
  errors: [],
  messages: [],
};

export const action = async ({ request, context }: ActionArgs) => {
  try {
    const MAX_FILE_SIZE = 5_000_000; // 5MB
    const uploadHandler = createMemoryUploadHandler({
      maxPartSize: MAX_FILE_SIZE,
    });

    const formData = await parseMultipartFormData(request, uploadHandler);

    const body = await schema.parseAsync({
      file: formData.get("file"),
      uploadType: formData.get("uploadType"),
      mediaType: formData.get("mediaType"),
    });

    const data = await postCfDirectUploadApi({
      cfAccountId: context.CF_ID,
      cfApiToken: context.CF_API_TOKEN,
      formFields: body,
    });

    const uploaded = await postCfUploadApi({
      uploadUrl: data.result.uploadURL,
      formFields: body,
    });

    return json(uploaded);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json(
        {
          ...defaultError,
          errors: error.errors.map((e) => {
            const { message } = e;
            return { code: -1, message };
          }),
        },
        { status: 400 }
      );
    }

    if (error instanceof FetchError) {
      const $response = error.response;
      const data = await $response.json<FetchRespSchema.CfUploadResp>();
      return json(data, { status: $response.status });
    }

    return json(defaultError, { status: 500 });
  }
};

export type Action = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/action/upload";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
