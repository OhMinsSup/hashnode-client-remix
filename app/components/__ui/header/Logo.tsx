import React from "react";
import { Link } from "@remix-run/react";

// components
import { Logo as RemixLogo } from "~/components/__ui/logo";
import { MenuIcon } from "~/components/__ui/Icon";
import Button from "~/components/__ui/shared/Button";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

const Logo = () => {
  return (
    <div className="header-logo">
      <Button
        aria-label="menu button"
        aira-haspopup="menu"
        aria-expanded={false}
        className="menu-button"
      >
        <MenuIcon className="icon" />
      </Button>
      <span>
        <Link to={PAGE_ENDPOINTS.ROOT} className="link-logo">
          <RemixLogo className="icon-logo" />
        </Link>
      </span>
    </div>
  );
};

export default Logo;
