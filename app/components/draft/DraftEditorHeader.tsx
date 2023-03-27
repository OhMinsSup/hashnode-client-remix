import React, { useCallback } from "react";
import { useDraftContext } from "~/context/useDraftContext";
import { SidebarMenuIcon, TimeIcon } from "~/components/__ui/Icon";

const DraftEditorHeader = () => {
  const { toggleLeftSidebar, visibility } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  return (
    <div className="draft-editor--header">
      <div className="header-wrapper">
        <div className="header--left">
          <button
            aria-controls="draft-sidebar"
            aria-label="toggle sidebar menu"
            aria-expanded={visibility.isLeftSidebarVisible}
            onClick={onToggleLeftSidebar}
          >
            <SidebarMenuIcon className="icon flex-shrink-0 !fill-none !stroke-current" />
          </button>
        </div>
        <div className="header--right">
          <div>
            <button
              className="btn-revision-history"
              aria-label="Revision history"
            >
              <TimeIcon className="icon" />
            </button>
          </div>
          <button className="btn-publish" aria-label="Publish">
            <span>Publish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditorHeader;
