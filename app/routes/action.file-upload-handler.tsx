import {
  json,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";
import cookies from "cookie";
import { uploadApi } from "~/api/files/upload";
import { uploadSchema } from "~/api/files/validation/upload";
import { RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async (args: ActionArgs) => {
  const cloneReq = args.request.clone();
  const headers = cloneReq.headers;
  const cookie = headers.get("Cookie")
    ? // @ts-ignore
      cookies.parse(headers.get("Cookie"))
    : null;
  if (cookie && !cookie.access_token) {
    return json(
      {
        ok: false,
        upload: null,
        error: "Unauthorized",
      },
      {
        status: 401,
        statusText: "Unauthorized",
      }
    );
  }

  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: 5 * 1024 * 1024, // 최대 5MB
  });

  try {
    const formData = await parseMultipartFormData(args.request, uploadHandler);
    const file = formData.get("file");
    const uploadType = formData.get("uploadType");
    const mediaType = formData.get("mediaType");

    const _input_body = {
      file,
      uploadType,
      mediaType,
    };

    const body = await uploadSchema.safeParseAsync(_input_body);
    if (!body.success) {
      return json(
        {
          ok: false,
          upload: null,
          error: body.error,
        },
        { status: STATUS_CODE.BAD_REQUEST }
      );
    }
    const { json: data } = await uploadApi(body.data, {
      actionArgs: args,
    });
    if (data.resultCode !== RESULT_CODE.OK) {
      throw json({ ok: false, upload: null, error: data.error });
    }
    return json({
      ok: true,
      upload: data.result,
      error: null,
    });
  } catch (error) {
    const error_validation = ValidationErrorWrapper(error);
    if (error_validation) {
      return json(
        {
          ok: false,
          upload: null,
          error: error_validation.errors,
        },
        {
          status: error_validation.statusCode,
        }
      );
    }

    const error_http = await HTTPErrorWrapper(error);
    if (error_http) {
      return json(
        {
          ok: false,
          upload: null,
          error: error_http.errors,
        },
        {
          status: error_http.statusCode,
        }
      );
    }
    throw json({ ok: false, upload: null, error: null });
  }
};
