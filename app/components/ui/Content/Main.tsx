import React from "react";
import { LeftSidebar, RightSidebar } from "./_main";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <LeftSidebar />
      {children}
      <RightSidebar />
    </>
  );
};

export default Main;
