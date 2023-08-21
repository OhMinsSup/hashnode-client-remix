import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/util";
import { NAVIGATION_USER_MENU_ITEMS } from "~/constants/constant";

export default function AsideMenus() {
  return (
    <>
      <div className={styles.title}>
        <h1 className="text-2xl font-bold">User Settings</h1>
      </div>
      <div className={styles.menus}>
        {NAVIGATION_USER_MENU_ITEMS.map((item) => {
          return <AsideMenus.Menu key={item.id} item={item} />;
        })}
      </div>
    </>
  );
}

interface AsideMenuProps {
  item: (typeof NAVIGATION_USER_MENU_ITEMS)[0];
}

AsideMenus.Menu = function AsideMenu({ item }: AsideMenuProps) {
  return (
    <NavLink
      to={item.href}
      end
      className={({ isActive }) => {
        console.log(isActive);
        return cn(styles.menu, {
          menu_active: isActive,
          menu_default: !isActive,
        });
      }}
    >
      <item.icon className={styles.menu_icon} />
      <span>{item.title}</span>
    </NavLink>
  );
};
