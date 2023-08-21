import React from "react";

import { Outlet } from "@remix-run/react";
import { SettingLayout } from "~/components/setting/future/SettingLayout";
import { AsideMenus } from "~/components/setting/future/AsideMenus";
import { MainHeader } from "~/components/shared/future/MainHeader";

// remix
import { redirect } from "@remix-run/cloudflare";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

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
  return (
    <SettingLayout
      sidebar={<AsideMenus />}
      header={<MainHeader disableScroll />}
    >
      <Outlet />
    </SettingLayout>
  );
}
