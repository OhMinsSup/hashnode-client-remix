import React from "react";
import Logo from "~/components/ui/header/Logo";
import RightArea from "~/components/ui/header/RightArea";
import SearchForm from "~/components/ui/header/SearchForm";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="relative z-50">
      <div className="relative z-20 w-full border-b bg-white py-3 lg:flex">
        <div className="mx-auto grid w-full grid-cols-12 gap-4 sm:max-w-[640px] md:max-w-full lg:min-w-0 lg:max-w-full lg:px-6 xl:max-w-full xl:px-8 2xl:max-w-[1536px] 2xl:px-4">
          {/* Logo */}
          <Logo />
          {/* Search */}
          <SearchForm />
          {/* Right Area */}
          <RightArea />
        </div>
      </div>
    </header>
  );
};

export default Header;
