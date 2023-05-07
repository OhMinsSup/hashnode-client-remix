import React from "react";
import { Link } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { Icons } from "./Icons";
import HeaderByControlTheme from "~/components/shared/HeaderByControlTheme";
import HeaderByControlNotification from "~/components/shared/HeaderByControlNotification";
import HeaderByControlUserMenu from "~/components/shared/HeaderByControlUserMenu";

export default function HeaderRightArea() {
  return (
    <div className="header__right-area">
      <div className="btns-group__drafts">
        <div className="btn__drafts">
          <Link aria-label="move to draft page" to={PAGE_ENDPOINTS.DRAFT.ROOT}>
            <Icons.Pen className="icon__sm mr-2 fill-current" />
            <span>Write</span>
          </Link>
        </div>
      </div>
      <div className="header__subnavs">
        <HeaderByControlTheme />
        <HeaderByControlNotification />
        <HeaderByControlUserMenu />
      </div>
    </div>
  )
}
