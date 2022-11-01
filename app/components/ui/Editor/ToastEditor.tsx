import React, { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import type { EditorProps } from "@toast-ui/react-editor";

interface ToastEditorProps extends Omit<EditorProps, "onChange"> {
  onChangeHtml: (html: string) => void;
}

const ToastEditor: React.FC<ToastEditorProps> = ({
  onChangeHtml,
  ...otherProps
}) => {
  const editorRef = useRef<Editor | null>(null);

  const onChange = useCallback(() => {
    const instance = editorRef.current?.getInstance();
    if (!instance || !instance.getHTML) return;
    const html = instance.getHTML();
    onChangeHtml?.(html);
  }, [onChangeHtml, editorRef]);

  return (
    <Editor
      ref={editorRef}
      onChange={onChange}
      //   hooks={{
      //     addImageBlobHook: async (blob, callback) => {
      //       const image = await api.upload({
      //         file: blob as File,
      //         uploadType: "ETC",
      //       });
      //       callback(image.contentPath, (blob as File).name);
      //     },
      //   }}
      {...otherProps}
    />
  );
};

export default ToastEditor;
