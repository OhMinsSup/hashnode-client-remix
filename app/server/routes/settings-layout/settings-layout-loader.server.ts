import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { requireAuthCookie } from "~/server/auth.server";

export const settingsLayoutLoader = async ({
  context,
  request,
}: LoaderFunctionArgs) => {
  return requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);
};

export type RoutesLoaderData = typeof settingsLayoutLoader;
