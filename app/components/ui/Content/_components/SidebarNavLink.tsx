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
      to={to}
      className={({ isActive }) => {
        return classNames(
          "flex flex-row items-center border-r-2 px-4  py-2 font-medium",
          {
            "border-blue-500 text-blue-500": isActive,
            "border-transparent": !isActive,
          }
        );
      }}
      {...resetProps}
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarNavLink;
