import classNames from "classnames";
import React from "react";
import DraftEditorHeader from "~/components/draft/DraftEditorHeader";
import DraftEdtiorContent from "~/components/draft/DraftEdtiorContent";
import { useDraftContext } from "~/context/useDraftContext";

const DraftEditor = () => {
  const { visibility } = useDraftContext();
  return (
    <div
      className={classNames({
        "draft-editor": visibility.isLeftSidebarVisible,
        "draft-editor--close-sidebar": !visibility.isLeftSidebarVisible,
      })}
    >
      <DraftEditorHeader />
      <DraftEdtiorContent />
    </div>
  );
};

export default DraftEditor;
