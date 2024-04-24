import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const writeLayoutLoader = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);
  return null;
};

export type RoutesLoaderData = typeof writeLayoutLoader;
