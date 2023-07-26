import React from "react";
import styles from "./styles.module.css";
import { NAVIGATION_ITEMS } from "~/constants/constant";
import { NavLink, useLocation } from "@remix-run/react";
import classNames from "classnames";

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

  return (
    <NavLink
      aria-label={text}
      to={to}
      className={({ isActive }) => {
        return classNames(styles.item, {
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