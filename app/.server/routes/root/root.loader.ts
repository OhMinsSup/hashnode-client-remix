import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { initializeTheme, getTheme } from "~/.server/utils/theme.server";
import { initializeToast, getToast } from "~/.server/utils/toast.server";
import { getDomainUrl } from "~/utils/utils";
import {
  clearAuthHeaders,
  combineHeaders,
} from "~/.server/utils/request.server";
import { getAuthFromRequest } from "~/.server/utils/auth.server";

export const rootLoader = async ({ context, request }: LoaderFunctionArgs) => {
  initializeTheme(context.env.COOKIE_SESSION_SECRET);
  initializeToast(context.env.COOKIE_SESSION_SECRET);

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
    console.error(error);
    return json($object, {
      headers: combineHeaders(toastHeaders),
    });
  }
};

export type RoutesLoaderData = typeof rootLoader;
