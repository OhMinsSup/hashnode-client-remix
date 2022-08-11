import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import LexicalEditor from "./_components/LexicalEditor";
import { SharedHistoryContext } from "./_context/history";
import { SettingsProvider, useSettingsContext } from "./_context/setting";
import { Nodes } from "./_nodes/Nodes";
import theme from "./_theme/DefaultEditorTheme";

const InternalEditor = () => {
  const {
    settings: { emptyEditor, measureTypingPerf, isRichText },
  } = useSettingsContext();

  const initialConfig = {
    editorState: emptyEditor ? undefined : undefined,
    namespace: "RemixEditor",
    nodes: [...Nodes],
    onError: (error: Error) => {
      throw error;
    },
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <LexicalEditor />
      </SharedHistoryContext>
    </LexicalComposer>
  );
};

const Editor = () => {
  return (
    <SettingsProvider>
      <InternalEditor />
    </SettingsProvider>
  );
};

export default Editor;
