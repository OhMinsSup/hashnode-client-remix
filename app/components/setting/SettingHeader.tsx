import React from "react";
import { Link } from "@remix-run/react";
import { Icons } from "../shared/Icons";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import HeaderByControlTheme from "~/components/shared/HeaderByControlTheme";
import HeaderByControlNotification from "~/components/shared/HeaderByControlNotification";
import HeaderByControlUserMenu from "~/components/shared/HeaderByControlUserMenu";

export default function SettingHeader() {
  return (
    <div className="relative z-50">
      <div className="relative z-20 flex w-full border-b bg-white py-4">
        <div className="container mx-auto grid min-w-full grid-cols-12 gap-4 px-4 lg:min-w-0 lg:max-w-full lg:px-6 xl:max-w-full xl:px-8 2xl:px-4">
          <div className="col-span-8 flex flex-row items-center justify-start lg:col-span-8 xl:col-span-9">
            <button
              aria-label="menu button"
              aira-haspopup="menu"
              aria-expanded={false}
              className="relative rounded-lg px-2 py-1 text-slate-900 hover:bg-slate-200 lg:hidden"
            >
              <Icons.Menu className="icon__base fill-current" />
            </button>
            <span>
              <Link
                to={PAGE_ENDPOINTS.ROOT}
                className="block w-36 text-slate-900 md:w-44 xl:w-44 xl:pr-2"
              >
                <Icons.Logo className="icon__logo" />
              </Link>
            </span>
          </div>
          <div className="col-span-4 flex flex-row items-center justify-end lg:col-span-4 lg:justify-between xl:col-span-3">
            <div className="header__setting flex w-full flex-row items-center justify-end">
              <HeaderByControlTheme />
              <HeaderByControlNotification />
              <HeaderByControlUserMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
