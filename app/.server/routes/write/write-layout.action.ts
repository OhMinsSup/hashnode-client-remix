import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { getCookie } from '~/.server/utils/request.server';
import {
  createToastHeaders,
  redirectWithToast,
} from '~/.server/utils/toast.server';

type Json = {
  type: 'DRAFT_DELETE';
  postId: string;
  redirectUrl: string;
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { redirectUrl, postId, type } = await request.json<Json>();

  try {
    if (request.method !== 'DELETE') {
      const error = new Error();
      error.name = 'InvalidMethodError';
      error.message = 'Invalid method';
      throw error;
    }

    const { cookies } = getCookie(request);
    if (!cookies) {
      const error = new Error();
      error.name = 'InvalidCookieError';
      error.message = 'Failed to get cookie';
      throw error;
    }
  } catch (error) {
    const description =
      error instanceof Error
        ? error.message
        : 'Failed API request with no error message';
    return redirectWithToast(
      safeRedirect(redirectUrl),
      {
        type: 'error',
        description,
      },
      createToastHeaders,
    );
  }
};

export type RoutesActionData = typeof action;
