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

export default function Setting() {
  return (
    <div className="bg-slate-100">
      <SettingHeader />
      <div className="setting__container">
        <div className="wrapper">
          <SettingSidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
