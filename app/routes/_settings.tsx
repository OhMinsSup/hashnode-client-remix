import React from "react";

import { Outlet } from "@remix-run/react";
import SettingHeader from "~/components/setting/SettingHeader";
import SettingSidebar from "~/components/setting/SettingSidebar";

// remix
import { redirect } from "@remix-run/cloudflare";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// styles
import settingsStyles from "~/styles/routes/settings.css";

// types
import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
import SettingLayout from "~/components/setting/SettingLayout";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: settingsStyles }];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.user.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getClearAuthHeaders(),
    });
  }
  return null;
};

export type SettingsLoader = typeof loader;

export default function Routes() {
  return (
    <SettingLayout>
      <Outlet />
    </SettingLayout>
  );
}
