import { redirect } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const isAuthenticated = await context.api.auth.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.services.server.getClearAuthHeaders(),
    });
  }
  return null;
};
