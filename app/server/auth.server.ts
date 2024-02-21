import { RESULT_CODE } from "~/constants/constant";
import {
  clearAuthHeaders,
  getParsedCookie,
  readHeaderCookie,
} from "./utils/request.server";
import { type AppLoadContext, redirect } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";

export async function getAuthFromRequest(
  request: Request,
  context: AppLoadContext
) {
  try {
    const cookie = readHeaderCookie(request);
    if (!cookie) {
      return null;
    }

    const { access_token } = getParsedCookie(cookie);
    if (!access_token) {
      return null;
    }

    const response = await context.api.getMeHandler({
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
    });

    const data = await response.body;
    if (data?.resultCode !== RESULT_CODE.OK) {
      return null;
    }
    return data.result as SerializeSchema.SerializeUser;
  } catch (error) {
    console.error(error);
    return null;
  }
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
