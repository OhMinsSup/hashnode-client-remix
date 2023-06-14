import { redirect } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.user.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getClearAuthHeaders(),
    });
  }
  return null;
};
