import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useSettingsContext } from "../_context/setting";

const InternalEditor = () => {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettingsContext();

  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? undefined : undefined,
    namespace: "RemixEditor",
    // nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    // theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>Editor</LexicalComposer>
  );
};

export default InternalEditor;
