import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Blogs Overview — Hashnode',
  },
  {
    name: 'twitter:title',
    content: 'Blogs Overview — Hashnodee',
  },
  {
    name: 'og:title',
    content: 'Blogs Overview — Hashnode',
  },
]);
