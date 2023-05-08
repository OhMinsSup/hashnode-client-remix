import React from "react";
import { NavLink, useLocation } from "@remix-run/react";
import classNames from "classnames";

interface AppLeftSidebarNavLinkProps {
  to: string;
  text: string;
  applyActiveLinks?: string[];
  end?: boolean;
  icon?: React.ReactNode;
}

export default function AppLeftSidebarNavLink(
  props: AppLeftSidebarNavLinkProps
) {
  const { to, text, icon, applyActiveLinks, ...resetProps } = props;

  const location = useLocation();

  return (
    <NavLink
      aria-label={text}
      to={to}
      className={({ isActive }) => {
        return classNames("menu-link", {
          active: isActive || applyActiveLinks?.includes(location.pathname),
        });
      }}
      {...resetProps}
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}
