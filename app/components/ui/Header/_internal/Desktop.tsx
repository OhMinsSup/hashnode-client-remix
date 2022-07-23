import React from "react";
import { Logo, SearchForm } from "../_components";
interface DesktopProps {}

const Desktop: React.FC<DesktopProps> = () => {
  return (
    <div className="relative z-20 hidden w-full border-b bg-white py-3 lg:flex">
      <div className="mx-auto grid w-full grid-cols-8 gap-4 sm:max-w-[640px] md:max-w-3xl lg:min-w-0 lg:max-w-full lg:px-4 xl:max-w-full xl:px-8">
        {/* Logo */}
        <Logo />
        {/* Search */}
        <SearchForm />
        {/* Right Area */}
      </div>
    </div>
  );
};

export default Desktop;
