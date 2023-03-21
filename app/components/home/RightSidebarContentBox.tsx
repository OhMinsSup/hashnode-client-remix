import React from "react";
import { Link } from "@remix-run/react";

interface RightSidebarContentBoxProps {
  title: string;
  children: React.ReactNode;
  to?: string;
}

const RightSidebarContentBox: React.FC<RightSidebarContentBoxProps> = ({
  to,
  title,
  children,
}) => {
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
              See all
            </Link>
          </div>
        )}
      </div>
      {children}
      {/* Content */}
    </div>
  );
};

export default RightSidebarContentBox;
