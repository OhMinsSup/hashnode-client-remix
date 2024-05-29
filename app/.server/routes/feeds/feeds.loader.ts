import {
  unstable_defineLoader as defineLoader,
  json,
} from '@remix-run/cloudflare';

import { getCookie } from '~/.server/utils/request.server';
import {
  defaultPaginationResponse,
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { RESULT_CODE } from '~/constants/constant';
import { parseUrlParams } from '~/services/libs';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

export type Data = SerializeSchema.SerializePost<false>;

export type DataList = FetchRespSchema.ListResp<
  SerializeSchema.SerializePost<false>
>;

export type DataSchema = FetchRespSchema.Success<DataList>;

export const loader = defineLoader(async ({ request, context }) => {
  try {
    const { cookies } = getCookie(request);
    const post = context.agent.api.app.post;
    const response = await post.getListHandler<DataSchema>({
      ...(cookies ? { headers: { Cookie: cookies } } : {}),
      query: {
        pageNo: '1',
        ...parseUrlParams(request.url),
      },
    });

    const data = response._data;
    if (!data || (data && data.resultCode !== RESULT_CODE.OK)) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: 'Failed to get data',
      });
    }

    return json(successJsonResponse(data.result));
  } catch (error) {
    context.logger.error('[feeds.loader]', error);
    return json(
      errorJsonDataResponse(
        defaultPaginationResponse<Data>(),
        'Failed to get data',
      ),
    );
  }
});

export type RoutesLoaderData = typeof loader;
