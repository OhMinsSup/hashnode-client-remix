import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import {
  errorJsonResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import {
  createToastHeaders,
  redirectWithToast,
} from '~/.server/utils/toast.server';
import { PAGE_ENDPOINTS, RESULT_CODE } from '~/constants/constant';
import { isFetchError } from '~/services/api/error';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { RequestMethod } from '~/services/libs/request-method.enum';
import { FormFieldValues } from '~/services/validate/post-create-api.validate';

type Json = FormFieldValues;

type DataSchema = FetchRespSchema.Success<null>;

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const { id } = params;

  try {
    if (!id) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.TOAST,
        data: 'parameter is missing',
      });
    }

    if (request.method.toUpperCase() !== RequestMethod.PUT) {
      throw createError({
        statusMessage: 'Method Not Allowed',
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        displayType: ErrorDisplayType.TOAST,
        data: 'not allowed method',
      });
    }

    const input = await request.json<Json>();

    context.logger.debug('[write.$id.action]', input);

    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.TOAST,
        data: 'failed to sign in',
      });
    }

    const post = context.agent.api.app.post;
    const response = await post.putHandler<DataSchema>(id, {
      body: input,
      headers: {
        Cookie: cookies,
      },
    });

    const data = response._data;
    if (!data || (data && data.resultCode !== RESULT_CODE.OK)) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.TOAST,
        data: `failed to post update with no data`,
      });
    }

    return json(
      successJsonResponse({
        ok: true,
      }),
    );
  } catch (error) {
    context.logger.error('[write.$id.action]', error);
    if (isError<string>(error)) {
      if (error.displayType === ErrorDisplayType.TOAST && id) {
        return redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          {
            type: 'error',
            description: error.data ?? 'failed to update post',
          },
          createToastHeaders,
        );
      }
    }

    if (isFetchError<FetchRespSchema.Error>(error)) {
      if (error.data && id) {
        return redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.WRITE.ID(id)),
          {
            type: 'error',
            description: error.data.message.at(0) ?? 'failed to update post',
          },
          createToastHeaders,
        );
      }
    }

    throw error;
  }
};

export type RoutesActionData = typeof action;
