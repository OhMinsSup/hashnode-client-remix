import {
  unstable_defineAction as defineAction,
  json,
} from '@remix-run/cloudflare';
import { namedAction } from 'remix-utils/named-action';

import { getAuthFromRequest } from '~/.server/utils/auth.server';
import { clearAuthHeaders } from '~/.server/utils/request.server';
import {
  errorJsonDataResponse,
  successJsonResponse,
} from '~/.server/utils/response.server';
import { commit, setTheme } from '~/.server/utils/theme.server';
import { isTheme } from '~/context/useThemeContext';
import { createError, ErrorDisplayType } from '~/services/libs/error';
import { HttpStatus } from '~/services/libs/http-status.enum';

type Data = FetchRespSchema.Auth;

type DataSchema = FetchRespSchema.Success<Data>;

export const action = defineAction(async ({ request, context }) => {
  return namedAction(request, {
    async logout() {
      try {
        const session = await getAuthFromRequest(request, context);
        if (!session) {
          throw createError({
            statusMessage: 'Unauthorized',
            statusCode: HttpStatus.UNAUTHORIZED,
            displayType: ErrorDisplayType.NONE,
            data: null,
          });
        }
        return json(successJsonResponse(null), {
          headers: clearAuthHeaders(),
        });
      } catch (error) {
        context.logger.error('[root.logout]', error);
        return json(errorJsonDataResponse(null, 'logout failed'), {
          headers: clearAuthHeaders(),
        });
      }
    },
    async setTheme() {
      const requestText = await request.text();
      const form = new URLSearchParams(requestText);
      const theme = form.get('theme');
      if (!isTheme(theme)) {
        return json(
          errorJsonDataResponse(
            false,
            `theme value of ${theme} is not a valid theme.`,
          ),
        );
      }
      const session = await setTheme(request, theme);
      return json(successJsonResponse(true), {
        headers: {
          'Set-Cookie': await commit(request, session),
        },
      });
    },
  });
});

export type RoutesActionData = typeof action;
