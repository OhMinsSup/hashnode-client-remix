import React from "react";
import { Link } from "@remix-run/react";
import { Logo as RemixLogo } from "~/components/ui/Logo";

const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      {/* TODO: Mobile Menu Button */}
      <span
        style={{
          WebkitTouchCallout: "none",
        }}
      >
        <Link to={"/"} className="block w-36 md:w-48 lg:w-full">
          <RemixLogo className="h-5 w-full fill-current" />
        </Link>
      </span>
    </div>
  );
};

export default Logo;
