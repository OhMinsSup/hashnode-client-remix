import React, { useState } from "react";
import { type NodeKey } from "lexical";
import { useMethods } from "react-use";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "~/components/ui/Shared";

import { IS_APPLE } from "~/libs/browser-utils";
import { ArrowCounterClockWise } from "../../Icon";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const [state, methods] = useMethods(createMethods, initialState);

  console.log("editor", editor);

  return (
    <div className="toolbar">
      <Button
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        className="toolbar-item spaced"
        isDisabled={!state.canUndo}
        aria-label="Undo"
      >
        <ArrowCounterClockWise className="format undo h-4 w-4 fill-current" />
      </Button>
    </div>
  );
};

export default ToolbarPlugin;

interface InitialState {
  blockType: keyof typeof blockTypeToBlockName;
  selectedElementKey: NodeKey | null;
  fontSize: string;
  fontColor: string;
  bgColor: string;
  fontFamily: string;
  isLink: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isCode: boolean;
  canUndo: boolean;
  canRedo: boolean;
  codeLanguage: string;
}

const initialState: InitialState = {
  blockType: "paragraph",
  selectedElementKey: null,
  fontSize: "15px",
  fontColor: "#000",
  bgColor: "#fff",
  fontFamily: "Arial",
  isLink: false,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isSubscript: false,
  isSuperscript: false,
  isCode: false,
  canRedo: false,
  canUndo: false,
  codeLanguage: "",
};

function createMethods(state: InitialState) {
  return {
    reset() {
      return initialState;
    },
    setBlockType(blockType: keyof typeof blockTypeToBlockName) {
      return {
        ...state,
        blockType,
      };
    },
    setSelectedElementKey(elementKey: NodeKey | null) {
      return {
        ...state,
        selectedElementKey: elementKey,
      };
    },
    setFontSize(fontSize: string) {
      return {
        ...state,
        fontSize,
      };
    },
    setFontColor(fontColor: string) {
      return {
        ...state,
        fontColor,
      };
    },
    setBgColor(bgColor: string) {
      return {
        ...state,
        bgColor,
      };
    },
    setFontFamily(fontFamily: string) {
      return {
        ...state,
        fontFamily,
      };
    },
    setIsLink(isLink: boolean) {
      return {
        ...state,
        isLink,
      };
    },
    setBlod(isBold: boolean) {
      return {
        ...state,
        isBold,
      };
    },
    setIsItalic(isItalic: boolean) {
      return {
        ...state,
        isItalic,
      };
    },
    setIsUnderline(isUnderline: boolean) {
      return {
        ...state,
        isUnderline,
      };
    },
    setIsStrikethrough(isStrikethrough: boolean) {
      return {
        ...state,
        isStrikethrough,
      };
    },
    setIsSubscript(isSubscript: boolean) {
      return {
        ...state,
        isSubscript,
      };
    },
    setIsSuperscript(isSuperscript: boolean) {
      return {
        ...state,
        isSuperscript,
      };
    },
    setIsCode(isCode: boolean) {
      return {
        ...state,
        isCode,
      };
    },
    setCanUndo(canUndo: boolean) {
      return {
        ...state,
        canUndo,
      };
    },
    setCanRedo(canRedo: boolean) {
      return {
        ...state,
        canRedo,
      };
    },
    setCodeLanguage(codeLanguage: string) {
      return {
        ...state,
        codeLanguage,
      };
    },
  };
}
