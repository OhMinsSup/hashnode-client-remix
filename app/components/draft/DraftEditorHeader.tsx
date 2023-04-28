import React, { useCallback } from "react";
import { useDraftContext } from "~/context/useDraftContext";
import { Icons } from "~/components/shared/Icons";

const DraftEditorHeader = () => {
  const { toggleLeftSidebar, visibility, togglePublish } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  const onTogglePublish = useCallback(() => {
    togglePublish(!visibility.isPublishVisible);
  }, [togglePublish, visibility.isPublishVisible]);

  return (
    <div className="draft-editor--header">
      <div className="header-wrapper">
        <div className="header--left">
          <button
            type="button"
            aria-controls="draft-sidebar"
            aria-label="toggle sidebar menu"
            aria-expanded={visibility.isLeftSidebarVisible}
            onClick={onToggleLeftSidebar}
          >
            <Icons.EditorSidebar className="icon__base flex-shrink-0 stroke-current" />
          </button>
        </div>
        <div className="header--right">
          <div>
            <button
              type="button"
              className="btn-revision-history"
              aria-label="Revision history"
            >
              <Icons.Time className="icon__base fill-current" />
            </button>
          </div>
          <div
            data-orientation="vertical"
            aria-orientation="vertical"
            role="separator"
            className="separator mr-2"
          ></div>
          <button
            type="button"
            className="btn-publish"
            aria-label="Publish"
            onClick={onTogglePublish}
          >
            <span>Publish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditorHeader;
