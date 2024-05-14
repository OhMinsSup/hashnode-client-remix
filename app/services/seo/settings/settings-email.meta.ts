import type { MetaFunction } from '@remix-run/cloudflare';

import { mergeMeta } from '~/services/libs';

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: 'Change Email Preferences — Hashnode',
  },
  {
    name: 'twitter:title',
    content: 'Change Email Preferences — Hashnode',
  },
  {
    name: 'og:title',
    content: 'Change Email Preferences — Hashnode',
  },
]);
