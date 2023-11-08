import React from "react";
import styles from "./styles.module.css";
import { NAVIGATION_EXPLORE_ITEMS } from "~/constants/constant";
import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/util";

interface ExploreTabsProps {
  children: React.ReactNode;
}

export default function ExploreTabs({ children }: ExploreTabsProps) {
  return (
    <div className={styles.root}>
      <div className={styles.tab_btn_group}>
        {NAVIGATION_EXPLORE_ITEMS.map((item, index) => {
          return (
            <NavLink
              end
              className={({ isActive }) => {
                return cn(isActive ? styles.tab_btn_active : styles.tab_btn);
              }}
              to={item.href}
              key={item.id}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div className={styles.tab_content}>{children}</div>
    </div>
  );
}
