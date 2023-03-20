import React from "react";
import { Link } from "@remix-run/react";

interface RightContentBoxProps {
  title: string;
  children: React.ReactNode;
  to?: string;
}

const RightContentBox: React.FC<RightContentBoxProps> = ({
  to,
  title,
  children,
}) => {
  return (
    <div className="section">
      <div className="section-header">
        {/* Title */}
        <div className="title">
          <h2>{title}</h2>
        </div>
        {/* See all */}
        {to && (
          <div className="more-btn-wrapper">
            <Link to={to} className="more-btn" aria-label="See all">
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

export default RightContentBox;
