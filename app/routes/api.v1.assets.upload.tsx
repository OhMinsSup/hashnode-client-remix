import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
} from '@remix-run/cloudflare';
import { parseWithZod } from '@conform-to/zod';

import { getCookie, SearchParams } from '~/.server/utils/request.server';
import { errorJsonDataResponse } from '~/.server/utils/response.server';
import { isFetchError } from '~/services/api/error';
import { getQueryPath } from '~/services/libs';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { schema } from '~/services/validate/cf-file.validate';

type Data = FetchRespSchema.File;

type DataSchema = FetchRespSchema.Success<Data>;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: null,
      });
    }

    const MAX_FILE_SIZE = 5_000_000; // 5MB
    const uploadHandler = createMemoryUploadHandler({
      maxPartSize: MAX_FILE_SIZE,
    });

    const formData = await parseMultipartFormData(request, uploadHandler);
    const submission = parseWithZod(formData, {
      schema,
    });

    if (submission.status !== 'success') {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: submission.error,
      });
    }

    const fileApi = context.agent.api.app.file;
    const response1 =
      await fileApi.postDirectUploadHandler<CloudflareSchema.CfDirectUpload>(
        context.env.CF_ID,
        context.env.CF_API_TOKEN,
      );

    if (!response1._data) {
      throw createError({
        statusMessage: response1.statusText,
        statusCode: response1.status,
        displayType: ErrorDisplayType.NONE,
        data: 'cloudflare direct upload failed',
      });
    }

    const { uploadURL } = response1._data.result;

    const response2 = await fileApi.postCloudflareUploadHandler(
      uploadURL,
      submission.value.file,
    );
    if (response2.status === 'error') {
      throw createError({
        statusMessage: response2.data.statusText,
        statusCode: response2.data.status,
        displayType: ErrorDisplayType.NONE,
        data: 'cloudflare upload failed',
      });
    }
    const { id, variants } = response2.data.result;

    const response3 = await fileApi.postFileCreateHandler<DataSchema>({
      body: {
        cfId: id,
        filename: submission.value.file.name,
        mimeType: submission.value.file.type,
        publicUrl: variants[0],
        mediaType: submission.value.mediaType,
        uploadType: submission.value.uploadType,
      },
      headers: {
        Cookie: cookies,
      },
    });

    if (!response3._data) {
      throw createError({
        statusMessage: response3.statusText,
        statusCode: response3.status,
        displayType: ErrorDisplayType.NONE,
        data: 'failed to create file',
      });
    }

    return json({
      status: 'success' as const,
      result: response3._data.result,
      errors: null,
    });
  } catch (error) {
    context.logger.error('[api.v1.assets.upload]', error);
    if (isError<string | Record<string, any>>(error)) {
      return json(errorJsonDataResponse(null, error.message));
    }

    if (isFetchError<DataSchema>(error)) {
      return json(errorJsonDataResponse(null, error.message));
    }

    throw error;
  }
};

export type RoutesActionData = typeof action;

export const loader = () => redirect('/', { status: 404 });

export const getBasePath = '/api/v1/assets/upload';

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
