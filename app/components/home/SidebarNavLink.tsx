import React from "react";
import { NavLink, useLocation } from "@remix-run/react";
import classNames from "classnames";

interface SidebarNavLinkProps {
  to: string;
  text: string;
  applyActiveLinks?: string[];
  end?: boolean;
  icon?: React.ReactNode;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = (props) => {
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
};

export default SidebarNavLink;
