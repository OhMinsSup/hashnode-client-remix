import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { SearchParams } from '~/.server/utils/request.server';
import { getCookie } from '~/.server/utils/request.server';
import {
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { isFetchError } from '~/services/api/error';
import { getQueryPath, parseUrlParams } from '~/services/libs';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { getQueryFn } from '~/services/react-query';

export type Data = SerializeSchema.SerializeTag<false>;

export type DataList = Data[];

export type DataSchema = FetchRespSchema.Success<DataList>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: [] as DataList,
      });
    }

    const tag = context.agent.api.app.tag;
    const response = await tag.getWidgetHandler<DataSchema>({
      headers: {
        Cookie: cookies,
      },
      query: parseUrlParams(request.url),
    });

    const data = response._data;
    return json(successJsonResponse(data ? data.result : []));
  } catch (error) {
    context.logger.error('[ERROR]', error);
    if (isError<DataSchema>(error)) {
      return json(errorJsonDataResponse(error.data, error.message));
    }

    if (isFetchError<DataSchema>(error)) {
      return json(errorJsonDataResponse([] as DataList, error.message));
    }

    throw error;
  }
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = '/api/v1/tags/widget';

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

type QueryKey = [string, SearchParams];

interface UseTagWidgetQueryParams {
  initialData?: DataSchema;
  originUrl?: string;
  searchParams?: SearchParams;
}

export function useTagWidgetQuery(opts?: UseTagWidgetQueryParams) {
  const queryKey: QueryKey = [getBasePath, opts?.searchParams];
  return useSuspenseQuery({
    queryKey,
    queryFn: getQueryFn<DataSchema, QueryKey>(getPath, opts),
  });
}
