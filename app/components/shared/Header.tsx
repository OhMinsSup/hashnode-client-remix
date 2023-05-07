import React from "react";

// constants
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderRightArea from "./HeaderRightArea";

export default function Header() {
  return (
    <header className="header__app">
      <div className="header__desktop">
        <div className="header__desktop-container">
          <HeaderLogo />
          <HeaderSearch />
          <HeaderRightArea />
        </div>
      </div>
    </header>
  );
}
