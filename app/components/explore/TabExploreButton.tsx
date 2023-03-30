import React from "react";
import { NavLink } from "@remix-run/react";

interface TabExploreButtonProps {
  id: string;
  currentPathname: string;
  path: string;
  label: string;
}

function TabExploreButton({
  id,
  label,
  currentPathname,
  path,
}: TabExploreButtonProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return "tab__item" + (isActive ? "  active" : "");
      }}
      tabIndex={path === currentPathname ? 0 : -1}
      data-key={path}
      id={id}
      aria-selected={path === currentPathname ? "true" : "false"}
      role="tab"
    >
      {label}
    </NavLink>
  );
}

export default TabExploreButton;

TabExploreButton.Skeleton = function TabExploreButtonSkeleton() {
  return (
    <div
      className="explore-link animate-pulse"
      tabIndex={-1}
      data-key="0"
      id="tab-0"
      aria-selected="false"
      role="tab"
    >
      <span className="h-4 w-16 rounded-full bg-gray-200" />
    </div>
  );
};
