import { EditorContent } from "@tiptap/react";
import { useRef } from "react";

// import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "./hooks/useBlockEditor";

// import { Loader } from "@/components/ui/Loader";
// import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
// import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
// import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
// import { createPortal } from "react-dom";
// import { TextMenu } from "../menus/TextMenu";
// import { ContentItemMenu } from "../menus/ContentItemMenu";

export default function BlockEditor() {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  console.log("BlockEditor", editorRef);

  const { editor } = useBlockEditor();

  console.log(editor);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex h-full" ref={menuContainerRef}>
        <EditorContent
          ref={editorRef}
          editor={editor}
          className="flex-1 overflow-y-auto"
        />
        {/* <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} /> */}
      </div>
    </>
  );
}
