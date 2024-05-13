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
import { RESULT_CODE } from '~/constants/constant';
import { isFetchError } from '~/services/api/error';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { RequestMethod } from '~/services/libs/request-method.enum';

type Json = {
  type: 'DRAFT_DELETE' | 'POST_DELETE';
  postId: string;
  redirectUrl: string;
};

type DataSchema = FetchRespSchema.Success<null>;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { redirectUrl, postId } = await request.json<Json>();

  try {
    if (request.method.toUpperCase() !== RequestMethod.DELETE) {
      throw createError({
        statusMessage: 'Method Not Allowed',
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        displayType: ErrorDisplayType.TOAST,
        data: 'not allowed method',
      });
    }

    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
      });
    }

    const post = context.agent.api.app.post;
    const response = await post.deleteHandler<DataSchema>(postId, {
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
        data: `Failed to delete data with no data`,
      });
    }

    return json(
      successJsonResponse({
        ok: true,
      }),
    );
  } catch (error) {
    context.logger.error('[write-layout.action]', error);
    if (isError<string>(error)) {
      if (error.displayType === ErrorDisplayType.TOAST) {
        return redirectWithToast(
          safeRedirect(redirectUrl),
          {
            type: 'error',
            description: error.data ?? 'failed to sign in',
          },
          createToastHeaders,
        );
      }
    }

    if (isFetchError<FetchRespSchema.Error>(error)) {
      if (error.data) {
        return json(
          errorJsonResponse(error.message, {
            [error.data.error]: {
              message: error.data.message,
            },
          }),
        );
      }
    }

    throw error;
  }
};

export type RoutesActionData = typeof action;
