import React from "react";

import { DraftSidebarProvider } from "~/context/useDraftSidebarContext";
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar";
import MyDraftSidebar from "~/components/draft/MyDraftSidebar";
import WriteDraftSidebar from "~/components/draft/WriteDraftSidebar";

interface DraftTemplateProps {
  children: React.JSX.Element;
}

export default function DraftTemplate({ children }: DraftTemplateProps) {
  return (
    <div className="draft-template">
      <DraftSidebarProvider>
        <DraftLeftSidebar
          myDrafts={<MyDraftSidebar />}
          writeDraft={<WriteDraftSidebar />}
        />
      </DraftSidebarProvider>
      {children}
    </div>
  );
};

