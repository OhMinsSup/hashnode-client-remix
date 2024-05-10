import { useRef } from 'react';
import { EditorContent } from '@tiptap/react';

import { ContentItemMenu } from '../components/ContentItemMenu';
import { LinkMenu } from '../components/LinkMenu';
import { TextMenu } from '../components/TextMenu';
import { ImageBlockMenu } from '../extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '../extensions/MultiColumn/menus';
import { useBlockEditor } from '../hooks/useBlockEditor';

export default function BlockEditor() {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { editor } = useBlockEditor();

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
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </>
  );
}
