import React from "react";
import { NavLink } from "@remix-run/react";
import classNames from "classnames";

interface SidebarNavLinkProps {
  to: string;
  text: string;
  end?: boolean;
  icon?: React.ReactNode;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = (props) => {
  const { to, text, icon, ...resetProps } = props;
  return (
    <NavLink
      aria-label={text}
      to={to}
      className={({ isActive }) => {
        return classNames("menu-link", {
          active: isActive,
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
