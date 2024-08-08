import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getAuthFromRequest } from '~/.server/utils/auth.server';
import { successJsonResponse } from '~/.server/utils/response.server';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  try {
    const userInfo = await getAuthFromRequest(request, context, {
      throwException: true,
    });

    if (!userInfo) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: 'Unauthorized',
      });
    }

    return json(successJsonResponse(userInfo));
  } catch (error) {
    context.logger.error('[settings-layout.loader]', error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
};

export type RoutesLoaderData = typeof loader;
