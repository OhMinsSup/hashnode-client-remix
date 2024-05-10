import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';
import omit from 'lodash-es/omit';

import { errorJsonResponse } from '~/.server/utils/response.server';
import {
  createToastHeaders,
  redirectWithToast,
} from '~/.server/utils/toast.server';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { isFetchError } from '~/services/api/error';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { getValidatedFormData } from '~/services/libs/form-data';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { RequestMethod } from '~/services/libs/request-method.enum';
import {
  FormFieldValues,
  resolver,
} from '~/services/validate/signup-api.validate';

type Data = FetchRespSchema.Auth;

type DataSchema = FetchRespSchema.Success<Data>;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  try {
    if (request.method.toUpperCase() !== RequestMethod.POST) {
      throw createError({
        statusMessage: 'Method Not Allowed',
        statusCode: HttpStatus.METHOD_NOT_ALLOWED,
        displayType: ErrorDisplayType.TOAST,
        data: 'not allowed method',
      });
    }

    const { errors, data } = await getValidatedFormData<FormFieldValues>(
      request,
      resolver,
    );

    if (errors) {
      return json(errorJsonResponse('validation failed', errors));
    }

    const auth = context.agent.api.app.auth;
    const response = await auth.signupHandler<DataSchema>({
      body: omit(data, ['confirmPassword']),
    });

    const cookie = response.headers.get('set-cookie');
    if (!cookie) {
      throw createError({
        statusMessage: 'Forbidden',
        statusCode: HttpStatus.FORBIDDEN,
        displayType: ErrorDisplayType.TOAST,
        data: 'failed to sign up',
      });
    }

    return redirect(safeRedirect(PAGE_ENDPOINTS.ROOT), {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (e) {
    if (isError<string>(e)) {
      if (e.displayType === ErrorDisplayType.TOAST) {
        return redirectWithToast(
          safeRedirect(PAGE_ENDPOINTS.AUTH.SIGNUP),
          {
            type: 'error',
            description: e.data ?? 'failed to sign up',
          },
          createToastHeaders,
        );
      }
    }

    if (isFetchError<FetchRespSchema.Error>(e)) {
      if (e.data) {
        return json(
          errorJsonResponse(e.message, {
            [e.data.error]: {
              message: e.data.message,
            },
          }),
        );
      }
    }

    throw e;
  }
};

export type RoutesActionData = typeof action;
