import type { AppLoadContext } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { safeRedirect } from 'remix-utils/safe-redirect';

import { RESULT_CODE } from '~/constants/constant';
import { clearAuthHeaders, getCookie } from './request.server';

interface GetAuthFromRequestOptions {
  throwException?: boolean;
}

type Data = FetchRespSchema.Success<SerializeSchema.SerializeUser>;

export async function getAuthFromRequest(
  request: Request,
  context: AppLoadContext,
  options = { throwException: false } as GetAuthFromRequestOptions,
) {
  try {
    const { cookies } = getCookie(request);
    if (!cookies) {
      return null;
    }

    const user = context.agent.api.app.user;
    const response = await user.getMyInfoHandler<Data>({
      headers: {
        Cookie: cookies,
      },
    });

    const data = response._data;
    if (data?.resultCode !== RESULT_CODE.OK) {
      return null;
    }
    return data.result;
  } catch (error) {
    console.error(error);
    if (options.throwException) {
      throw error;
    }
    return null;
  }
}

export async function requireAuthCookie(
  request: Request,
  context: AppLoadContext,
  redirectUrl: string,
) {
  const session = await getAuthFromRequest(request, context);
  if (!session) {
    throw redirect(safeRedirect(redirectUrl), {
      headers: clearAuthHeaders(),
    });
  }
  return session;
}

export async function redirectIfLoggedInLoader(
  request: Request,
  context: AppLoadContext,
  redirectUrl: string,
) {
  const session = await getAuthFromRequest(request, context);
  if (session) {
    throw redirect(safeRedirect(redirectUrl));
  }
  return null;
}
