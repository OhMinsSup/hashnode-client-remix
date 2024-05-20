import {
  unstable_defineAction as defineAction,
  json,
  redirect,
} from '@remix-run/cloudflare';

import { SearchParams } from '~/.server/utils/request.server';
import { getQueryPath } from '~/services/libs';

export const action = defineAction(async () => {
  return json({
    status: 'success' as const,
    result: {},
    errors: null,
  });
});

export type RoutesActionData = typeof action;

export const loader = () => redirect('/', { status: 404 });

export const getBasePath = '/test';

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
