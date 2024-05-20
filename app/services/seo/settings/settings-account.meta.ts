import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Account Settings Hashnode',
  },
  {
    name: 'twitter:title',
    content: 'Account Settings Hashnode',
  },
  {
    name: 'og:title',
    content: 'Account Settings Hashnode',
  },
]);
