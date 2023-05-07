import React from "react";
import { Link } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { Icons } from "./Icons";

export default function HeaderLogo() {
  return (
    <div className="header__logo">
      <button
        aria-label="menu button"
        aira-haspopup="menu"
        aria-expanded={false}
        className="btn__menu-header"
      >
        <Icons.Menu className="icon__base fill-current" />
      </button>
      <span>
        <Link to={PAGE_ENDPOINTS.ROOT} className="header__logo-link">
          <Icons.Logo className="icon__logo" />
        </Link>
      </span>
    </div>
  );
}
