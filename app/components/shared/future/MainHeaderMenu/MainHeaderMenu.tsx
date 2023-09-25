import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

import { Icons } from "~/components/shared/Icons";
import { Link } from "@remix-run/react";
import { MainMenuUserMenu } from "~/components/shared/future/MainMenuUserMenu";
import { MainMenuUserProfileMenu } from "~/components/shared/future/MainMenuUserProfileMenu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { Theme, useTheme } from "~/context/useThemeContext";
import { useOptionalSession } from "services/hooks/useSession";
import { useMediaQuery } from "~/libs/hooks/useMediaQuery";

export default function MainHeaderMenu() {
  const [open_menu, setToggleMenu] = useState(false);
  const [theme, setTheme] = useTheme();

  const session = useOptionalSession();

  const isMobile = useMediaQuery("(max-width: 768px)", false);

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }, [setTheme]);

  return (
    <>
      <div className={styles.search}>
        <button type="button" className={styles.btn_search}>
          <Icons.Search />
        </button>
      </div>
      <div className={styles.write}>
        <div className={styles.btn_write}>
          <Link to={PAGE_ENDPOINTS.DRAFT.ROOT} aria-label="Write">
            <Icons.Write />
            <span>Write</span>
          </Link>
        </div>
      </div>
      <div className={styles.menus}>
        <div className={styles.menus_btn_area}>
          {isMobile && (
            <div>
              <Link
                to={PAGE_ENDPOINTS.DRAFT.ROOT}
                aria-label="Write"
                className={styles.btn_write_mobile}
              >
                <Icons.V2.Pen />
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleTheme}
            className={classNames(styles.menus_btn_theme, {
              [styles.moon]: theme === Theme.LIGHT,
              [styles.sun]: theme === Theme.DARK,
            })}
          >
            {theme === Theme.DARK ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          <div className={styles.btn_wrapper}>
            <button type="button" className={styles.meus_btn_notification}>
              <Icons.Notification />
              <span className={styles.menu_notification_count}>1</span>
            </button>
          </div>
        </div>
        <DropdownMenu.Root open={open_menu} onOpenChange={setToggleMenu}>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label="Profile Dropdown"
              className={styles.menus_user_profile}
            >
              <div className={styles.menus_user_profile_container}>
                {session?.profile.avatarUrl ? (
                  <img
                    loading="lazy"
                    src={session.profile.avatarUrl}
                    alt="profile"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={ASSET_URL.DEFAULT_AVATAR}
                    alt="profile"
                  />
                )}
              </div>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={10}
              data-navigation-user-menu
              className={styles.menu_user_profile_portal}
            >
              {session ? (
                <MainMenuUserProfileMenu open={open_menu} session={session} />
              ) : (
                <MainMenuUserMenu open={open_menu} />
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </>
  );
}
