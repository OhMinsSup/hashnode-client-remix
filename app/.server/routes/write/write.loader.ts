import {
  unstable_defineLoader as defineLoader,
  redirect,
} from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

type Data = FetchRespSchema.Id<string>;

type DataSchema = FetchRespSchema.Success<Data>;

export const loader = defineLoader(async ({ request, context }) => {
  const { searchParams } = new URL(request.url);
  const isNewDraft = searchParams.get('isNewDraft');
  const tag = searchParams.get('tag');
  const tags: string[] = tag ? tag.split(',') : [];

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

    const draft = context.agent.api.app.draft;
    const response = await draft.postSyncDraftHandler<DataSchema>({
      headers: {
        Cookie: cookies,
      },
      body: {
        tags,
        title: 'Untitled',
        isNewDraft: isNewDraft ? isNewDraft === 'true' : false,
      },
    });

    const data = response._data;
    if (!data) {
      throw createError({
        statusMessage: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        displayType: ErrorDisplayType.NONE,
        data: 'Failed to create draft data with no data',
      });
    }

    const dataId = data.result.dataId;
    let nextUrl = safeRedirect(PAGE_ENDPOINTS.WRITE.ID(dataId));
    if (searchParams.size > 0) {
      if (searchParams.has('isNewDraft')) {
        searchParams.delete('isNewDraft');
      }
      nextUrl += `?${searchParams.toString()}`;
    }
    return redirect(nextUrl);
  } catch (error) {
    context.logger.error('[write.loader]', error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
});

export type RoutesLoaderData = typeof loader;
