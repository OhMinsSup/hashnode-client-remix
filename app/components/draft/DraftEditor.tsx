import classNames from "classnames";
import React from "react";
import { useMedia } from "react-use";
import DraftEditorHeader from "~/components/draft/DraftEditorHeader";
import DraftEdtiorContent from "~/components/draft/DraftEdtiorContent";
import { useDraftContext } from "~/context/useDraftContext";

const DraftEditor = () => {
  const { visibility } = useDraftContext();

  const isMobile = useMedia("(max-width: 768px)");

  return (
    <div
      className={classNames({
        "draft-editor": visibility.isLeftSidebarVisible,
        "draft-editor--close-sidebar": !visibility.isLeftSidebarVisible,
        "!hidden": isMobile && visibility.isLeftSidebarVisible,
      })}
    >
      <DraftEditorHeader />
      <DraftEdtiorContent />
    </div>
  );
};

export default DraftEditor;
