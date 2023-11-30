import React, { Suspense, useCallback, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

import { Icons } from "~/components/shared/Icons";
import { Await, Link, useRouteLoaderData } from "@remix-run/react";
import { MainMenuUserMenu } from "~/components/shared/future/MainMenuUserMenu";
import { MainMenuUserProfileMenu } from "~/components/shared/future/MainMenuUserProfileMenu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { Theme, useTheme } from "~/context/useThemeContext";
import { useOptionalSession } from "~/services/hooks/useSession";
import { useMediaQuery } from "~/libs/hooks/useMediaQuery";

import type { RoutesLoader as MainRoutesLoader } from "~/routes/_main";

export default function MainHeaderMenu() {
  return (
    <MainHeaderMenu.Wrapper
      btnMobileWrite={<MainHeaderMenu.MobileWrite />}
      btnWrite={<MainHeaderMenu.Write />}
      btnTheme={<MainHeaderMenu.Theme />}
      btnNotification={<MainHeaderMenu.Notification />}
      menus={<MainHeaderMenu.Menus />}
    />
  );
}

interface InternalWapperProps {
  btnWrite: React.ReactNode;
  btnMobileWrite: React.ReactNode;
  btnTheme: React.ReactNode;
  btnNotification: React.ReactNode;
  menus: React.ReactNode;
}

MainHeaderMenu.Wrapper = function Item({
  btnWrite,
  btnMobileWrite,
  btnNotification,
  btnTheme,
  menus,
}: InternalWapperProps) {
  return (
    <>
      <div className={styles.search}>
        <button type="button" className={styles.btn_search}>
          <Icons.Search />
        </button>
      </div>
      {btnWrite}
      <div className={styles.menus}>
        <div className={styles.menus_btn_area}>
          {btnMobileWrite}
          {btnTheme}
          {btnNotification}
        </div>
        {menus}
      </div>
    </>
  );
};

MainHeaderMenu.Notification = function Item() {
  const session = useOptionalSession();
  const data = useRouteLoaderData<MainRoutesLoader>("routes/_main");

  if (!session) return null;

  return (
    <Suspense fallback={<></>}>
      <Await resolve={data?.notificationCount}>
        {(data) => {
          const count = data ?? 0;
          return (
            <div className={styles.btn_wrapper}>
              <button type="button" className={styles.meus_btn_notification}>
                <Icons.Notification />
                {count > 0 ? (
                  <span className={styles.menu_notification_count}>{data}</span>
                ) : null}
              </button>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

MainHeaderMenu.Theme = function Item() {
  const [theme, setTheme] = useTheme();

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }, [setTheme]);

  return (
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
  );
};

MainHeaderMenu.Write = function Item() {
  const session = useOptionalSession();
  if (!session) return null;

  return (
    <div className={styles.write}>
      <div className={styles.btn_write}>
        <Link to={PAGE_ENDPOINTS.WRITE.ROOT} aria-label="Write">
          <Icons.V2.Write />
          <span>Write</span>
        </Link>
      </div>
    </div>
  );
};

MainHeaderMenu.MobileWrite = function Item() {
  const session = useOptionalSession();
  const isMobile = useMediaQuery("(max-width: 768px)", false);

  if (!session || !isMobile) return null;

  return (
    <div>
      <Link
        to={PAGE_ENDPOINTS.WRITE.ROOT}
        aria-label="Write"
        className={styles.btn_write_mobile}
      >
        <Icons.V2.Pen />
      </Link>
    </div>
  );
};

MainHeaderMenu.Menus = function Item() {
  const [open_menu, setToggleMenu] = useState(false);
  const session = useOptionalSession();

  return (
    <DropdownMenu.Root open={open_menu} onOpenChange={setToggleMenu}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Profile Dropdown"
          className={styles.menus_user_profile}
        >
          <div className={styles.menus_user_profile_container}>
            {session?.userImage?.avatarUrl ? (
              <img
                loading="lazy"
                src={session.userImage.avatarUrl}
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
  );
};
