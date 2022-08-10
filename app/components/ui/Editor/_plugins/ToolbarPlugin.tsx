import React, { useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  type NodeKey,
} from "lexical";
import { useMethods, useMedia } from "react-use";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "~/components/ui/Shared";

import { IS_APPLE } from "~/libs/browser-utils";
import { ArrowClockWise, ArrowCounterClockWise } from "../../Icon";
import BlockFormatDropDown from "../_components/BlockFormatDropDown";
import { useCallback } from "react";
import {
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

export const blockTypeToBlockName = {
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
  const isLage = useMedia("(min-width: 1024px)", false);

  const [state, methods] = useMethods(createMethods, initialState);

  const onChangeBlockType = useCallback(
    (blockType: keyof typeof blockTypeToBlockName) => {
      methods.setBlockType(blockType);
    },
    [methods]
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        methods.setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          console.log("???", type);

          methods.setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            methods.setBlockType(type as keyof typeof blockTypeToBlockName);
          }
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [activeEditor, updateToolbar]);

  return (
    <div
      style={{
        minHeight: !isLage ? "83.5px" : "48px",
      }}
    >
      <div
        style={{
          transform: "translateZ(0px)",
        }}
      >
        <div className="toolbar relative z-30 border-t border-b bg-white py-2">
          <div className="flex flex-row flex-wrap justify-between">
            <div className="flex flex-row items-center font-normal">123</div>
            <div className="hidden flex-row md:mt-2 md:flex md:w-full lg:mt-0 lg:w-auto">
              {state.blockType in blockTypeToBlockName &&
                activeEditor === editor && (
                  <BlockFormatDropDown
                    blockType={state.blockType}
                    editor={editor}
                    onChangeBlockType={onChangeBlockType}
                  />
                )}
              <Button
                title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
                className="relative inline-flex flex-row items-center justify-center rounded-full border border-transparent px-2 py-1 text-center text-sm font-medium text-gray-700 outline-none"
                isDisabled={!state.canUndo}
                onPress={() => {
                  console.log("undo");
                }}
                aria-label="Undo"
              >
                <ArrowCounterClockWise className="h-4 w-4 fill-current" />
              </Button>
              <Button
                title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
                className="relative inline-flex flex-row items-center justify-center rounded-full border border-transparent px-2 py-1 text-center text-sm font-medium text-gray-700 outline-none"
                isDisabled={!state.canRedo}
                onPress={() => {
                  console.log("redo");
                }}
                aria-label="Redo"
              >
                <ArrowClockWise className="h-4 w-4 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      </div>
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
