import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import {
  unstable_defineLoader as defineLoader,
  json,
} from '@remix-run/cloudflare';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';

type DraftDataSchema = FetchRespSchema.Success<
  FetchRespSchema.ListResp<SerializeSchema.SerializePost<false>>
>;

export const loader = defineLoader(
  async ({ context, request }: LoaderFunctionArgs) => {
    const { cookies } = getCookie(request);

    const drafts: SerializeSchema.SerializePost<false>[] = [];
    let draftTotal = 0;
    if (cookies) {
      try {
        const draft = context.agent.api.app.draft;
        const response = await draft.getDraftsHandler<DraftDataSchema>({
          headers: {
            Cookie: cookies,
          },
          query: {
            limit: '5',
            pageNo: '1',
          },
        });

        const data = response._data;
        context.logger.info('[drafts]', data);
        if (data) {
          drafts.push(...data.result.list);
          draftTotal = data.result.totalCount;
        }
      } catch (error) {
        // noops
      }
    }

    return json(
      successJsonResponse({
        drafts,
        draftTotal,
      }),
      {
        headers: {
          'Cache-Control': 'public, max-age=120',
        },
      },
    );
  },
);

export type RoutesLoaderData = typeof loader;
