import React, { useLayoutEffect } from "react";
import styles from "./styles.module.css";

import { Link } from "@remix-run/react";

import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

interface MainMenuUserMenuProps {
  open: boolean;
}

export default function MainMenuUserMenu({ open }: MainMenuUserMenuProps) {
  useLayoutEffect(() => {
    const $content_wrapper = document.querySelector(
      "div[data-radix-popper-content-wrapper]"
    );
    // ele 자식요소의 data 속성에서 "data-navigation-user-menu"가 존재하는 경우
    const $navigation_user_menu = $content_wrapper?.querySelector(
      "div[data-navigation-user-menu]"
    );
    if (!$navigation_user_menu) return;
    // ele 자식요소의 data 속성에서 "data-navigation-user-menu"가 존재하는 경우
    const currentStyles = $navigation_user_menu.getAttribute("style");
    if (currentStyles) {
      $navigation_user_menu.setAttribute(
        "style",
        `outline: none; width: 280px; ${currentStyles} pointer-events: auto;`
      );
    }
  }, [open]);

  return (
    <div className={styles.root}>
      <div className={styles.container_profile}>
        <div className={styles.menus_user_profile_container}>
          <img loading="lazy" src={ASSET_URL.DEFAULT_AVATAR} alt="profile" />
        </div>
      </div>
      <h1 className={styles.h1}>Sign up or log in to your Hashnode account</h1>
      <p className={styles.p}>Takes only a few seconds</p>
      <div className={styles.btn_groups}>
        <Link to={PAGE_ENDPOINTS.AUTH.SIGNUP} className={styles.btn_signup}>
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              stroke="currentColor"
              d="M4.94 16.264a5.831 5.831 0 0 1 5.06-2.93 5.831 5.831 0 0 1 5.06 2.93M18.334 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Zm-5.555-1.852a2.778 2.778 0 1 1-5.556 0 2.778 2.778 0 0 1 5.556 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
            ></path>
          </svg>
          <span>Sign up</span>
        </Link>
        <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN} className={styles.btn_signin}>
          <span>Log in</span>
        </Link>
      </div>
    </div>
  );
}
