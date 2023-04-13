import React from "react";
import classNames from "classnames";

import { Icons } from "~/components/shared/Icons";
import { NavLink, Outlet } from "@remix-run/react";
import Header from "~/components/shared/Header";

// remix
import { redirect, json } from "@remix-run/cloudflare";

// api
import { getSessionApi } from "~/api/user/user";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// styles
import settingsStyles from "~/styles/routes/settings.css";

// types
import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: settingsStyles }];
};

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  if (!session) {
    return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
      headers,
    });
  }

  return json(
    {
      session,
    },
    {
      headers,
    }
  );
};

export default function Setting() {
  return (
    <div className="bg-slate-100">
      <Header.SettingPage />
      <div className="setting__container">
        <div className="wrapper">
          <div className="menu__sidebar">
            <div className="menu__sidebar-title">
              <h1 className="text-2xl font-bold">User Settings</h1>
            </div>
            <div className="menu__sidebar-menu">
              <NavLink
                to="/settings"
                end
                className={({ isActive }) => {
                  return classNames("menu__sidebar-item", {
                    active: isActive,
                  });
                }}
              >
                <Icons.UserProfile className="mr-4 h-6 w-6 fill-current opacity-75" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/settings/account"
                end
                className={({ isActive }) => {
                  return classNames("menu__sidebar-item", {
                    active: isActive,
                  });
                }}
              >
                <Icons.Settings className="mr-4 h-6 w-6 fill-current opacity-75" />
                <span>Account</span>
              </NavLink>
            </div>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
