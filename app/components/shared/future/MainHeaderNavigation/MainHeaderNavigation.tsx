import React from "react";
import styles from "./styles.module.css";
import { NAVIGATION_ITEMS, PAGE_ENDPOINTS } from "~/constants/constant";
import { NavLink, useLocation } from "@remix-run/react";
import { cn } from "~/utils/util";
import { useOptionalSession } from "~/api/user/hooks/useSession";

export default function MainHeaderNavigation() {
  return (
    <>
      {NAVIGATION_ITEMS.filter((item) => item.position.includes("top")).map(
        (item) => (
          <MainHeaderNavigation.Item
            key={item.id}
            to={item.href}
            text={item.title}
            applyActiveLinks={item.applyActiveLinks}
          />
        )
      )}
    </>
  );
}

interface MainDrawerMenuItemProps {
  to: string;
  text: string;
  applyActiveLinks?: string[];
}

MainHeaderNavigation.Item = function MainHeaderNavigationItem(
  props: MainDrawerMenuItemProps
) {
  const { to, text, applyActiveLinks, ...resetProps } = props;

  const location = useLocation();
  const session = useOptionalSession();
  if (!session && to === PAGE_ENDPOINTS.USERS.ROOT) {
    return null;
  }

  return (
    <NavLink
      aria-label={text}
      to={to}
      className={({ isActive }) => {
        return cn(styles.item, {
          [styles.active]:
            isActive || applyActiveLinks?.includes(location.pathname),
        });
      }}
      {...resetProps}
    >
      {text}
    </NavLink>
  );
};
