import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: '[Draft]',
  },
  {
    name: 'twitter:title',
    content: '[Draft]',
  },
  {
    name: 'og:title',
    content: '[Draft]',
  },
]);
