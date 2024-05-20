import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Developer Settings — Hashnode',
  },
  {
    name: 'twitter:title',
    content: 'Developer Settings — Hashnode',
  },
  {
    name: 'og:title',
    content: 'Developer Settings — Hashnode',
  },
]);
