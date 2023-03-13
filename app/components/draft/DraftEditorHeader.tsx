import React, { useCallback } from "react";
import Button from "~/components/ui/shared/Button";
import { useDraftContext } from "~/context/useDraftContext";
import { SidebarMenuIcon, TimeIcon } from "~/components/ui/Icon";

const DraftEditorHeader = () => {
  const { toggleLeftSidebar, visibility } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  return (
    <div className="draft-editor--header">
      <div className="header-wrapper">
        <div className="header--left">
          <Button
            aria-controls="draft-sidebar"
            aria-label="toggle sidebar menu"
            aria-expanded={visibility.isLeftSidebarVisible}
            onPress={onToggleLeftSidebar}
          >
            <SidebarMenuIcon className="icon flex-shrink-0 !fill-none !stroke-current" />
          </Button>
        </div>
        <div className="header--right">
          <div>
            <Button
              className="btn-revision-history"
              aria-label="Revision history"
            >
              <TimeIcon className="icon" />
            </Button>
          </div>
          <Button className="btn-publish" aria-label="Publish">
            <span>Publish</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditorHeader;
