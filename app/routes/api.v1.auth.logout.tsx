import {
  unstable_defineAction as defineAction,
  json,
  redirect,
} from '@remix-run/cloudflare';

import { getAuthFromRequest } from '~/.server/utils/auth.server';
import { clearAuthHeaders } from '~/.server/utils/request.server';
import {
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

export const action = defineAction(async ({ request, context }) => {
  try {
    const session = await getAuthFromRequest(request, context);
    if (!session) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: null,
      });
    }
    return json(successJsonResponse(null), {
      headers: clearAuthHeaders(),
    });
  } catch (error) {
    context.logger.error('[ERROR]', error);
    if (isError(error)) {
      return json(errorJsonDataResponse(null, error.message), {
        headers: clearAuthHeaders(),
      });
    }
  }
});

export type RoutesActionData = typeof action;

export const loader = () => redirect('/', { status: 404 });

export const getPath = () => {
  return '/api/v1/auth/logout';
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
