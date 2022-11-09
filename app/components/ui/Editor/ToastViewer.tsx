import React, { useEffect, useRef, useState } from "react";

// types
import type { ViewerProps } from "@toast-ui/react-editor";

interface ToastViewerProps extends ViewerProps {}

const ToastViewer: React.FC<ToastViewerProps> = ({ ...otherProps }) => {
  const editorRef = useRef<any>(null);
  const instance = useRef<any>({});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { ClientEditor } = instance.current || {};

  useEffect(() => {
    async function load() {
      // @ts-ignore
      const { Viewer } = await import("@toast-ui/react-editor");
      instance.current = { ClientEditor: Viewer };
      setEditorLoaded(true);
    }

    load();
  }, []);

  if (!editorLoaded) return null;

  return <ClientEditor ref={editorRef} {...otherProps} />;
};

export default ToastViewer;
