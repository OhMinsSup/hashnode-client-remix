import React from "react";
import { Link } from "@remix-run/react";

interface AppRightSidebarContentBoxProps {
  title: string;
  children: React.ReactNode;
  to?: string;
  toText?: string;
}

export default function AppRightSidebarContentBox({
  to,
  toText = "See all",
  title,
  children,
}: AppRightSidebarContentBoxProps) {
  return (
    <div className="right-sidebar__content-box">
      <div className="right-sidebar__content-box-header">
        {/* Title */}
        <div className="title">
          <h2>{title}</h2>
        </div>
        {/* See all */}
        {to && (
          <div className="btn__more">
            <Link to={to} aria-label="See all">
              {toText}
            </Link>
          </div>
        )}
      </div>
      {children}
      {/* Content */}
    </div>
  );
}
