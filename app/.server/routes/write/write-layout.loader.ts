import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

type Data = SerializeSchema.SerializeGetLeftSidePostCount;

type DataSchema = FetchRespSchema.Success<Data>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const data: Data = {
    submitted: 0,
    draft: 0,
    published: 0,
  };

  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: 'Unauthorized',
      });
    }

    const widget = context.agent.api.app.widget;
    const response = await widget.getLeftSidePostCountHandler<DataSchema>({
      headers: {
        Cookie: cookies,
      },
    });
    if (response._data) {
      Object.assign(data, response._data.result);
    }
  } catch (error) {
    context.logger.error('[write-layout.loader]', error);
  }

  return json(successJsonResponse(data));
};

export type RoutesLoaderData = typeof loader;
