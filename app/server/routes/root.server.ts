import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { initializeTheme, getTheme } from "~/server/utils/theme.server";
import { initializeToast, getToast } from "~/server/utils/toast.server";
import { getDomainUrl } from "~/utils/util";
import {
  clearAuthHeaders,
  combineHeaders,
} from "~/server/utils/request.server";
import { setHashnodeAgent } from "~/services/agent/hashnode-agent";

export const rootLoader = async ({ context, request }: LoaderFunctionArgs) => {
  setHashnodeAgent({
    service: context.env.API_BASE_URL,
    prefix: "/api",
  });

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
    const session = null;

    const $data = Object.assign({}, $object, {
      currentProfile: session,
    });

    const headers = clearAuthHeaders();

    return {
      data: $data,
      headers: combineHeaders(toastHeaders, session ? null : headers),
    };
  } catch (error) {
    return {
      data: $object,
      headers: combineHeaders(toastHeaders),
    };
  }
};
