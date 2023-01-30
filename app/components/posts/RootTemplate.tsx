import React from "react";
import { Main } from "../ui/main";
import { Header } from "../ui/header";

interface RootTemplateProps {
  children: React.ReactNode;
}

const RootTemplate: React.FC<RootTemplateProps> = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Main>{children}</Main>
      </main>
    </div>
  );
};

export default RootTemplate;
