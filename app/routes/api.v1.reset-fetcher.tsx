import {
  unstable_defineAction as defineAction,
  redirect,
} from '@remix-run/cloudflare';

import { getQueryPath } from '~/services/libs';

export const action = defineAction(async () => {
  return null;
});

export type RoutesActionData = typeof action;

export const loader = () => redirect('/', { status: 404 });

export const getBasePath = '/api/v1/reset-fetcher';

export const getPath = () => {
  return getQueryPath(getBasePath);
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}

export const resetFetcher = (fetcher: any) => {
  fetcher.submit({}, { action: getPath(), method: 'post' });
};
