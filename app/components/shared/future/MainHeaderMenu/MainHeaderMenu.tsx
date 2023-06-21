import React from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import classNames from "classnames";

export default function MainHeaderMenu() {
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
          <div></div>
          <button
            type="button"
            className={classNames(styles.menus_btn_theme, {
              [styles.moon]: true,
              [styles.sun]: false,
            })}
          >
            <Icons.Moon />
          </button>
          <div></div>
        </div>
        <div className={styles.menus_user_profile}>123</div>
      </div>
    </>
  );
}
