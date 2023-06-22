import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import classNames from "classnames";
import { Theme, useTheme } from "~/context/useThemeContext";

export default function MainHeaderMenu() {
  const [theme, setTheme] = useTheme();

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
          <Link to={PAGE_ENDPOINTS.DRAFT.ROOT}>
            <Icons.Write />
            <span>Write</span>
          </Link>
        </div>
      </div>
      <div className={styles.menus}>
        <div className={styles.menus_btn_area}>
          <div className={styles.btn_wrapper}>
            <button type="button" className={styles.menus_btn_logs}>
              <svg fill="none" viewBox="0 0 18 18">
                <path
                  d="M4.5 6.75v4.5m0-4.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 4.5a2.25 2.25 0 1 0 2.25 2.25M4.5 11.25a2.25 2.25 0 0 1 2.25 2.25m6.75-6.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 0a6.75 6.75 0 0 1-6.75 6.75"
                  stroke="stroke-current"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
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
        <div className={styles.menus_user_profile}>123</div>
      </div>
    </>
  );
}
