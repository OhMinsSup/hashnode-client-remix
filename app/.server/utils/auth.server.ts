import { RESULT_CODE } from "~/constants/constant";
import {
  clearAuthHeaders,
  getParsedCookie,
  getTokenFromCookie,
  readHeaderCookie,
} from "./request.server";
import { type AppLoadContext, redirect } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";

interface GetAuthFromRequestOptions {
  throwException?: boolean;
}

type Data = FetchRespSchema.Success<SerializeSchema.SerializeUser>;

export async function getAuthFromRequest(
  request: Request,
  context: AppLoadContext,
  options = { throwException: false } as GetAuthFromRequestOptions
) {
  try {
    const { cookie } = requireCookie(request);
    if (!cookie) {
      return null;
    }

    const user = context.agent.api.app.user;

    const response = await user.getMyInfoHandler<Data>({
      headers: {
        Cookie: cookie,
      },
    });

    const data = response._data;
    if (data?.resultCode !== RESULT_CODE.OK) {
      return null;
    }
    return data.result;
  } catch (error) {
    if (options.throwException) {
      throw error;
    }

    return null;
  }
}

export function requireCookie(request: Request) {
  const cookie = readHeaderCookie(request);
  if (!cookie) {
    return {
      cookie: null,
      cookieData: null,
    };
  }

  const token = getTokenFromCookie(cookie);
  if (!token) {
    return {
      cookie: null,
      cookieData: null,
    };
  }

  return {
    cookie,
    token,
  };
}

export async function requireAuthCookie(
  request: Request,
  context: AppLoadContext,
  redirectUrl: string
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
  redirectUrl: string
) {
  const session = await getAuthFromRequest(request, context);
  if (session) {
    throw redirect(safeRedirect(redirectUrl));
  }
  return null;
}
