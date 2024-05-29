import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import {
  unstable_defineLoader as defineLoader,
  json,
} from '@remix-run/cloudflare';

import { getCookie } from '~/.server/utils/request.server';
import { successJsonResponse } from '~/.server/utils/response.server';

type Data = {
  draft: {
    totalCount: number;
    list: SerializeSchema.SerializePost<false>[];
  };
  trending: {
    totalCount: number;
    list: SerializeSchema.SerializePost<false>[];
  };
};

type DataSchema = FetchRespSchema.Success<Data>;

export const loader = defineLoader(
  async ({ context, request }: LoaderFunctionArgs) => {
    const { cookies } = getCookie(request);

    const widget = context.agent.api.app.widget;
    const response = await widget.getMainLayoutHandler<DataSchema>({
      ...(cookies && {
        headers: {
          Cookie: cookies,
        },
      }),
    });

    const defaultDraft: Data = {
      draft: {
        totalCount: 0,
        list: [],
      },
      trending: {
        totalCount: 0,
        list: [],
      },
    };

    return json(
      successJsonResponse({
        draft: response._data?.result.draft ?? defaultDraft.draft,
        trending: response._data?.result.trending ?? defaultDraft.trending,
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
