import React from "react";

// components
import { Link } from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

export default function HeaderNotifications() {
  return (
    <div className="popover__notification-container">
      <div className="popover__notification-wrapper">
        <div className="icon-wrapper">
          <Icons.NotificationPlus className="h-12 w-12 fill-current" />
        </div>
        <h1 className="no-auth">
          Sign in to see notifications from your favorite tech writers!
        </h1>
        <p className="no-auth">
          Learn insights from developers and people in tech from around the
          world. Grow 1% every day.
        </p>
        <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN} className="no-auth">
          <span>Let's start!</span>
        </Link>
      </div>
    </div>
  );
}
