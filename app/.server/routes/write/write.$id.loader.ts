import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';
import { PAGE_ENDPOINTS, RESULT_CODE } from '~/constants/constant';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

type Data = FetchRespSchema.Success<SerializeSchema.SerializePost<false>>;

export const loader = async ({
  request,
  context,
  params,
}: LoaderFunctionArgs) => {
  const { id } = params;

  try {
    if (!id) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: 'Bad Request',
      });
    }

    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: 'Unauthorized',
      });
    }

    const post = context.agent.api.app.post;
    const response = await post.getOwnerByIdHandler<Data>(id, {
      headers: {
        Cookie: cookies,
      },
    });

    const data = response._data;
    if (!data || (data && data.resultCode !== RESULT_CODE.OK)) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: 'Failed to create draft data with no data',
      });
    }

    return json(successJsonResponse(data.result));
  } catch (error) {
    context.logger.error('[write.$id.loader]', error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
};

export type RoutesLoaderData = typeof loader;
