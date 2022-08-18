import React, { useEffect, useState, useCallback } from "react";
import { useMethods, useMedia } from "react-use";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type NodeKey,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  $isCodeNode,
  CODE_LANGUAGE_MAP,
} from "@lexical/code";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isListNode, ListNode } from "@lexical/list";

import { IS_APPLE } from "~/libs/browser-utils";
import BlockFormatDropDown from "../_components/BlockFormatDropDown";
import CodLanguageDropDown from "../_components/CodLanguageDropDown";

export const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  quote: "Quote",
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
};

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

export const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const isLage = useMedia("(min-width: 1024px)", false);

  const [state, methods] = useMethods(createMethods, initialState);

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

      methods.setIsCode(selection.hasFormat("code"));

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

          methods.setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          if (type in blockTypeToBlockName) {
            methods.setBlockType(type as keyof typeof blockTypeToBlockName);
          }

          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            methods.setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : "plain"
            );
            return;
          }
        }
      }
    }
  }, [activeEditor, methods]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        console.log(_payload);
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
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          methods.setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          methods.setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
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
              <button
                disabled={!state.canUndo}
                onClick={() => {
                  activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
                className="toolbar-item spaced"
                aria-label="Undo"
              >
                <ArrowLeftIcon className="h-3 w-3 fill-current" />
              </button>
              <button
                disabled={!state.canRedo}
                onClick={() => {
                  activeEditor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
                className="toolbar-item"
                aria-label="Redo"
              >
                <ArrowRightIcon className="h-3 w-3 fill-current" />
              </button>
              {state.blockType in blockTypeToBlockName &&
                activeEditor === editor && (
                  <>
                    <BlockFormatDropDown
                      blockType={state.blockType}
                      editor={editor}
                    />
                  </>
                )}
              {state.blockType === "code" && (
                <CodLanguageDropDown
                  codeLanguage={state.codeLanguage}
                  editor={activeEditor}
                  selectedElementKey={state.selectedElementKey}
                />
              )}
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
      console.log("block", blockType);
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
