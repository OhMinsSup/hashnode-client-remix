import React from "react";

import LeftSidebar from "~/components/ui/main/LeftSidebar";
import RightSidebar from "~/components/ui/main/RightSidebar";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <React.Fragment>
      <LeftSidebar />
      {children}
      <RightSidebar />
    </React.Fragment>
  );
};

export default Main;
