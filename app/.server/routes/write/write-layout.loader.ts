import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { getCookie } from '~/.server/utils/request.server';

type DataSchema =
  FetchRespSchema.Success<SerializeSchema.SerializeGetLeftSidePostCount>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const widget = context.agent.api.app.widget;

  const data: SerializeSchema.SerializeGetLeftSidePostCount = {
    submitted: 0,
    draft: 0,
    published: 0,
  };

  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      return json(data);
    }
    const response = await widget.getLeftSidePostCountHandler<DataSchema>({
      headers: {
        Cookie: cookies,
      },
    });
    if (response._data) {
      Object.assign(data, response._data.result);
    }
  } catch (error) {
    console.error(error);
  }

  return json(data);
};

export type RoutesLoaderData = typeof loader;
