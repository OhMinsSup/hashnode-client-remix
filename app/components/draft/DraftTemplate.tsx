import React from "react";
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar";

interface DraftTemplateProps {
  children: React.ReactNode;
}

const DraftTemplate: React.FC<DraftTemplateProps> = ({ children }) => {
  return (
    <div className="draft-template">
      <DraftLeftSidebar />
      {children}
    </div>
  );
};

export default DraftTemplate;
