import {
  unstable_defineLoader as defineLoader,
  json,
} from '@remix-run/cloudflare';

import { redirectIfLoggedInLoader } from '~/.server/utils/auth.server';
import { successJsonResponse } from '~/.server/utils/response.server';
import { ASSET_URL, PAGE_ENDPOINTS } from '~/constants/constant';

type Data = SerializeSchema.Hashnodeonboard;

export const loader = defineLoader(async ({ request, context }) => {
  await redirectIfLoggedInLoader(request, context, PAGE_ENDPOINTS.ROOT);

  return json(
    successJsonResponse<Data>({
      image: ASSET_URL.DEFAULT_AVATAR,
      username: 'Guillermo Rauch',
      job: 'CEO, Vercel',
      description: `It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.`,
    }),
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
});

export type RoutesLoaderData = typeof loader;
