import { useImperativeHandle, useRef, forwardRef } from "react";
import type { Editor } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";

import { TiptapExtensions } from "./extensions";
// import { EditorBubbleMenu } from "./bubble-menu";
import { TiptapEditorProps } from "./props";
// import { ImageResizer } from "./extensions/image-resize";
import { useDebouncedCallback } from "use-debounce";

// define your extension array

export interface ITipTapRichTextEditor {
  value: string;
  onChange?: (json: any, html: string) => void;
  setIsSubmitting?: (
    isSubmitting: "submitting" | "submitted" | "saved"
  ) => void;
  setShouldShowAlert?: (showAlert: boolean) => void;
  editable?: boolean;
  forwardedRef?: any;
  debouncedUpdatesEnabled?: boolean;
}

const Tiptap = (props: ITipTapRichTextEditor) => {
  const {
    onChange,
    debouncedUpdatesEnabled,
    forwardedRef,
    editable,
    setIsSubmitting,
    setShouldShowAlert,
    value,
  } = props;

  const editor = useEditor({
    editable: editable ?? true,
    editorProps: TiptapEditorProps(setIsSubmitting),
    extensions: TiptapExtensions(setIsSubmitting),
    content: value,
    onUpdate: async ({ editor }) => {
      // for instant feedback loop
      setIsSubmitting?.("submitting");
      setShouldShowAlert?.(true);
      if (debouncedUpdatesEnabled) {
        debouncedUpdates({ onChange, editor });
      } else {
        onChange?.(editor.getJSON(), editor.getHTML());
      }
    },
  });

  const editorRef: React.MutableRefObject<Editor | null> = useRef(null);

  useImperativeHandle(forwardedRef, () => ({
    clearEditor: () => {
      editorRef.current?.commands.clearContent();
    },
    setEditorValue: (content: string) => {
      editorRef.current?.commands.setContent(content);
    },
  }));

  const debouncedUpdates = useDebouncedCallback(
    async ({ onChange, editor }) => {
      setTimeout(async () => {
        if (onChange) {
          onChange(editor.getJSON(), editor.getHTML());
        }
      }, 500);
    },
    1000
  );

  if (!editor) return null;
  editorRef.current = editor;

  return (
    <div
      id="tiptap-container"
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={`tiptap-editor-container`}
    >
      {/* {editor && <EditorBubbleMenu editor={editor} />} */}
      <EditorContent editor={editor} />
      {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
    </div>
  );
};

const TipTapEditor = forwardRef<ITipTapRichTextEditor, ITipTapRichTextEditor>(
  (props, ref) => <Tiptap {...props} forwardedRef={ref} />
);

TipTapEditor.displayName = "TipTapEditor";

export { TipTapEditor };
