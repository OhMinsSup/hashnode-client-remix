import {
  unstable_defineAction as defineAction,
  json,
  redirect,
} from '@remix-run/cloudflare';

import { SearchParams } from '~/.server/utils/request.server';
import {
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { commit, setTheme } from '~/.server/utils/theme.server';
import { isTheme } from '~/context/useThemeContext';
import { getQueryPath } from '~/services/libs';

export const action = defineAction(async ({ request }) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');
  if (!isTheme(theme)) {
    return errorJsonDataResponse(
      false,
      `theme value of ${theme} is not a valid theme.`,
    );
  }

  const session = await setTheme(request, theme);
  return json(successJsonResponse(true), {
    headers: {
      'Set-Cookie': await commit(request, session),
    },
  });
});

export type RoutesActionData = typeof action;

export const loader = () => redirect('/', { status: 404 });

export const getBasePath = '/api/v1/set-theme';

export const getPath = (searchParams?: SearchParams) => {
  return getQueryPath(getBasePath, searchParams);
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
