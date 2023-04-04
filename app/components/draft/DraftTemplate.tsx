import React from "react";
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar";
import { DraftSidebarProvider } from "~/context/useDraftSidebarContext";

interface DraftTemplateProps {
  children: React.ReactNode;
}

const DraftTemplate: React.FC<DraftTemplateProps> = ({ children }) => {
  return (
    <div className="draft-template">
      <DraftSidebarProvider>
        <DraftLeftSidebar />
      </DraftSidebarProvider>
      {children}
    </div>
  );
};

export default DraftTemplate;
