import React from "react";

import LeftSidebar from "~/components/ui/Main/LeftSidebar";
import RightSidebar from "~/components/ui/Main/RightSidebar";

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
