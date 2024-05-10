import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useQuery } from '@tanstack/react-query';

import { getCookie } from '~/.server/utils/request.server';
import {
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { getQueryPath } from '~/services/libs';
import { createError, ErrorDisplayType, isError } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';
import { getQueryFn } from '~/services/react-query';

type Data = FetchRespSchema.Success<
  FetchRespSchema.ListResp<Record<string, unknown>>
>;

type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

type QueryKey = [string, SearchParams];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
        displayType: ErrorDisplayType.NONE,
        data: 0,
      });
    }

    return json(successJsonResponse(0));
  } catch (error) {
    if (isError(error)) {
      return json(errorJsonDataResponse(0, error.message));
    }
  }
};

export type RoutesLoaderData = typeof loader;

export const getBasePath = '/api/v1/notifications/count';

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

interface UseNotificationCountQueryParams {
  initialData?: Data;
  searchParams?: SearchParams;
  enabled?: boolean;
}

export function useNotificationCountQuery({
  initialData,
  searchParams,
  enabled = true,
}: UseNotificationCountQueryParams) {
  const queryKey: QueryKey = [getBasePath, searchParams];

  return useQuery({
    queryKey,
    enabled,
    queryFn: getQueryFn(getPath),
    initialData,
    staleTime: 2 * 60 * 1000,
  });
}
