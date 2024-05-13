import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Editing Article',
  },
  {
    name: 'twitter:title',
    content: 'Editing Article',
  },
  {
    name: 'og:title',
    content: 'Editing Article',
  },
]);
