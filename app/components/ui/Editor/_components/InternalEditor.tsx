import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useSettingsContext } from "../_context/setting";

import theme from "../_theme/DefaultEditorTheme";
import Placeholder from "./Placeholder";
import ContentEditable from "./ContentEditable";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

const InternalEditor = () => {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf, isRichText },
  } = useSettingsContext();

  const initialConfig = {
    editorState: isCollab ? null : emptyEditor ? undefined : undefined,
    namespace: "RemixEditor",
    // nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme,
  };

  const text = isCollab
    ? "Enter some collaborative rich text..."
    : isRichText
    ? "Enter some rich text..."
    : "Enter some plain text...";

  const placeholder = <Placeholder>{text}</Placeholder>;

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={placeholder}
        // TODO Collab support until 0.4
        initialEditorState={isCollab ? null : undefined}
      />
    </LexicalComposer>
  );
};

export default InternalEditor;
