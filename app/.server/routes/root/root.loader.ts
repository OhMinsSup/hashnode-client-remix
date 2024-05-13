import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { getAuthFromRequest } from '~/.server/utils/auth.server';
import {
  clearAuthHeaders,
  combineHeaders,
} from '~/.server/utils/request.server';
import { getTheme, initializeTheme } from '~/.server/utils/theme.server';
import { getToast, initializeToast } from '~/.server/utils/toast.server';
import { getDomainUrl } from '~/services/libs';

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  initializeTheme(context.env.COOKIE_SESSION_SECRET);
  initializeToast(context.env.TOAST_SECRET);

  const { toast, headers: toastHeaders } = await getToast(request);
  const theme = await getTheme(request);

  const $object = {
    currentProfile: null,
    theme,
    toast,
    origin: getDomainUrl(request),
    env: {
      API_BASE_URL: context.env.API_BASE_URL,
    },
  };

  try {
    const session = await getAuthFromRequest(request, context);
    const $data = Object.assign({}, $object, {
      currentProfile: session,
    });

    const headers = clearAuthHeaders();
    return json($data, {
      headers: combineHeaders(toastHeaders, session ? null : headers),
    });
  } catch (error) {
    context.logger.error('[root.loader]', error);
    return json($object, {
      headers: combineHeaders(toastHeaders),
    });
  }
};

export type RoutesLoaderData = typeof loader;
