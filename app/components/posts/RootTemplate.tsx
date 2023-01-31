import React from "react";
import Main from "~/components/ui/main/Main";
import Header from "~/components/ui/header/Header";

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
