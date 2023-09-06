import React from "react";
import { Outlet } from "@remix-run/react";
import { redirect, type LoaderArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.auth.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.services.server.getClearAuthHeaders(),
    });
  }
  return null;
};

export type Loader = typeof loader;

export default function Routes() {
  return <Outlet />;
}
