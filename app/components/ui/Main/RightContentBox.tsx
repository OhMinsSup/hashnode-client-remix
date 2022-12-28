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
    <div className="mb-5 rounded-lg border bg-white p-5">
      <div className="mb-1 flex flex-row items-center">
        {/* Title */}
        <div className="flex-1">
          <h2 className="m-1 text-base font-extrabold xl:text-xl">{title}</h2>
        </div>
        {/* See all */}
        {to && (
          <div className="flex flex-shrink-0 flex-row items-center justify-start">
            <Link
              to={to}
              className=" flex-row items-center justify-center rounded-full border border-gray-200 py-1 px-3 text-center text-base font-medium outline-none"
            >
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
