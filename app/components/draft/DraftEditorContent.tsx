import DraftImageCoverPopover from "./DraftImageCoverPopover";
import DraftEditorTitle from "./DraftEditorTitle";
import DraftEditorSubtitle from "./DraftEditorSubtitle";
import DraftEditorCover from "./DraftEditorCover";
import EditorContainer from "./EditorContainer";
import { ClientOnly } from "remix-utils";

export default function DraftEditorContent() {
  return (
    <div className="draft-editor--content">
      <div className="content-wrapper">
        <div className="content">
          <div>
            <div className="editor-toolbar-header">
              <DraftImageCoverPopover />
              <DraftEditorSubtitle.Button />
            </div>
            <DraftEditorCover />
            <DraftEditorTitle />
            <DraftEditorSubtitle />
          </div>
          {/* editor content */}
          <div className="relative z-20 px-4">
            <ClientOnly>{() => <EditorContainer />}</ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
