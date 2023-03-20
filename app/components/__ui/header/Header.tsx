import React from "react";
import Logo from "~/components/__ui/header/Logo";
import RightArea from "~/components/__ui/header/RightArea";
import SearchForm from "~/components/__ui/header/SearchForm";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="main-header">
      {/* Mobile */}
      {/* Disktop */}
      <div className="main-desktop-header">
        <div className="area">
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
