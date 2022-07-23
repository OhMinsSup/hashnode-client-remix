import React from "react";
import { Desktop } from "./_internal";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="relative z-50">
      <Desktop />
    </header>
  );
};

export default Header;
