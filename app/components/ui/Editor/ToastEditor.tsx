import React, { useCallback, useEffect, useRef, useState } from "react";

// hooks
import { useImageUploadMutation } from "~/api/files";

// types
import type { EditorProps } from "@toast-ui/react-editor";

interface ToastEditorProps extends Omit<EditorProps, "onChange"> {
  onChangeHtml: (html: string) => void;
}

const ToastEditor: React.FC<ToastEditorProps> = ({
  onChangeHtml,
  ...otherProps
}) => {
  const editorRef = useRef<any>(null);
  const instance = useRef<any>({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { ClientEditor } = instance.current || {};

  const { mutateAsync } = useImageUploadMutation();

  const onChange = useCallback(() => {
    const instance = editorRef.current?.getInstance();
    if (!instance || !instance.getHTML) return;
    const html = instance.getHTML();
    onChangeHtml?.(html);
  }, [onChangeHtml, editorRef]);

  useEffect(() => {
    async function load() {
      // @ts-ignore
      const { Editor } = await import("@toast-ui/react-editor");
      instance.current = { ClientEditor: Editor };
      setEditorLoaded(true);
    }

    load();
  }, []);

  if (!editorLoaded) return null;

  return (
    <ClientEditor
      ref={editorRef}
      onChange={onChange}
      hooks={{
        addImageBlobHook: async (blob: any, callback: any) => {
          const { result } = await mutateAsync({
            file: blob as File,
            uploadType: "IMAGE",
            mediaType: "IMAGE",
          });
          const { url, name } = result.result ?? {};
          callback(url, name);
        },
      }}
      {...otherProps}
    />
  );
};

export default ToastEditor;
