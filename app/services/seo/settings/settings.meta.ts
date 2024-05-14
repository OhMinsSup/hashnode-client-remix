import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Change settings Hashnode',
  },
  {
    name: 'twitter:title',
    content: 'Change settings Hashnode',
  },
  {
    name: 'og:title',
    content: 'Change settings Hashnode',
  },
]);
