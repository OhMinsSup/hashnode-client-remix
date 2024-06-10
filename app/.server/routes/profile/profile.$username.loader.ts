import {
  unstable_defineLoader as defineLoader,
  json,
  redirect,
} from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';
import { PAGE_ENDPOINTS, RESULT_CODE } from '~/constants/constant';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

type Data = FetchRespSchema.Success<SerializeSchema.SerializePost<false>>;

export const loader = defineLoader(async ({ request, context, params }) => {
  const { username } = params;

  try {
    if (!username) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: 'Bad Request',
      });
    }

    const { cookies, hasAuthToken } = getCookie(request);

    const user = context.agent.api.app.user;
    const response = await user.getUserInfoHandler<Data>(username, {
      ...(cookies &&
        hasAuthToken && {
          headers: {
            Cookie: cookies,
          },
        }),
    });

    const data = response._data;
    if (!data || (data && data.resultCode !== RESULT_CODE.OK)) {
      throw createError({
        statusMessage: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
        displayType: ErrorDisplayType.NONE,
        data: 'Failed to No data',
      });
    }

    return json(successJsonResponse(data.result));
  } catch (error) {
    context.logger.error('[profile.$username.loader]', error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
});

export type RoutesLoaderData = typeof loader;
