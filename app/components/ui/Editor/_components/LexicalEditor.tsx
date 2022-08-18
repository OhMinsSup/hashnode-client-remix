import React, { useRef } from "react";
import { useSettingsContext } from "../_context/setting";

import Placeholder from "./Placeholder";
import ContentEditable from "./ContentEditable";

import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ToolbarPlugin } from "../_plugins";
import { useSharedHistoryContext } from "../_context/history";
import { CodeHighlightPlugin } from "../_plugins/CodeHighlightPlugin";

const LexicalEditor = () => {
  const {
    settings: { isRichText },
  } = useSettingsContext();

  const { historyState } = useSharedHistoryContext();

  const text = isRichText
    ? "Enter some rich text..."
    : "Enter some plain text...";

  const placeholder = <Placeholder>{text}</Placeholder>;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isRichText && (
        <>
          <div className="relative z-30">
            <ToolbarPlugin />
          </div>
        </>
      )}
      <div className="editor-container" ref={scrollRef}>
        <AutoScrollPlugin scrollRef={scrollRef} />
        {isRichText ? (
          <>
            <HistoryPlugin externalHistoryState={historyState} />
            <RichTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              // TODO Collab support until 0.4
              initialEditorState={undefined}
            />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              // TODO Collab support until 0.4
              initialEditorState={undefined}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
      </div>
    </>
  );
};

export default LexicalEditor;
