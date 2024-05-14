import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';
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
  try {
    if (request.method.toUpperCase() !== RequestMethod.PUT) {
      throw createError({
        statusMessage: 'Method Not Allowed',
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        displayType: ErrorDisplayType.TOAST,
        data: 'not allowed method',
      });
    }

    const input = await request.json<Json>();

    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.TOAST,
        data: 'failed to sign in',
      });
    }

    const user = context.agent.api.app.user;
    const response = await user.putHandler<DataSchema>({
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
        data: `failed to user update with no data`,
      });
    }

    return json(
      successJsonResponse({
        ok: true,
      }),
    );
  } catch (error) {
    context.logger.error('[settings.action]', error);
    if (isError<string>(error)) {
      if (error.displayType === ErrorDisplayType.TOAST) {
        return redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.SETTINGS.ROOT),
          {
            type: 'error',
            description: error.data ?? 'failed to update user',
          },
          createToastHeaders,
        );
      }
    }

    if (isFetchError<FetchRespSchema.Error>(error)) {
      if (error.data) {
        return redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.SETTINGS.ROOT),
          {
            type: 'error',
            description: error.data.message.at(0) ?? 'failed to update user',
          },
          createToastHeaders,
        );
      }
    }

    throw error;
  }
};

export type RoutesActionData = typeof action;
