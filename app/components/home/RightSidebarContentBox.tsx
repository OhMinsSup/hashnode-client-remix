import React from "react";
import { Link } from "@remix-run/react";

interface RightSidebarContentBoxProps {
  title: string;
  children: React.ReactNode;
  to?: string;
  toText?: string;
}

function RightSidebarContentBox({
  to,
  toText = "See all",
  title,
  children,
}: RightSidebarContentBoxProps) {
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

export default RightSidebarContentBox;

RightSidebarContentBox.Skeleton = function RightSidebarContentBoxSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="right-sidebar__content-box">
      <div className="right-sidebar__content-box-header">
        {/* Title */}
        <div className="title">
          <h2 className="h-6 w-32 rounded-full border bg-gray-200 !text-transparent">
            Loading...
          </h2>
        </div>
        <div className="btn__more">
          <a href="#" className="btn__more">
            See all
          </a>
        </div>
      </div>
      {/* Content */}
      {children}
    </div>
  );
};