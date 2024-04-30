import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { getDomainUrl } from "~/services/libs";

export const writeLayoutLoader = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  // TODO: single fetch defer request infinite loop issue??
  return json({
    originUrl: getDomainUrl(request),
  });
};

export type RoutesLoaderData = typeof writeLayoutLoader;
