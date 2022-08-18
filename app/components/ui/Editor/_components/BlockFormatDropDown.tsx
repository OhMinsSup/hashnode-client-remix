import React, { useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

// lexical
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
} from "lexical";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";

// components
import { blockTypeToBlockName } from "../_plugins/ToolbarPlugin";

interface BlockFormatDropDownProps {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
}

const BlockFormatDropDown: React.FC<BlockFormatDropDownProps> = ({
  editor,
  blockType,
}) => {
  const formatParagraph = useCallback(() => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createParagraphNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      if (blockType !== headingSize) {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapLeafNodesInElements(selection, () => {
              return $createHeadingNode(headingSize);
            });
          }
        });
      }
    },
    [blockType, editor]
  );

  const formatBulletList = useCallback(() => {
    if (blockType !== "bullet") {
      console.log("???");
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      console.log("???1111");
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatCheckList = useCallback(() => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatNumberedList = useCallback(() => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatQuote = useCallback(() => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapLeafNodesInElements(selection, () => $createQuoteNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatCode = useCallback(() => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $wrapLeafNodesInElements(selection, () => $createCodeNode());
          } else {
            selection.getNodes().forEach(() => {
              // Explicity set fallback text content for some decorators nodes.
              // if ($isTweetNode(node)) {
              //   node.replace(
              //     $createTextNode(
              //       `https://twitter.com/i/web/status/${node.getId()}`,
              //     ),
              //   );
              // } else if ($isYouTubeNode(node)) {
              //   node.replace(
              //     $createTextNode(
              //       `https://www.youtube.com/watch?v=${node.getId()}`,
              //     ),
              //   );
              // }
            });

            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection.insertRawText(textContent);
          }
        }
      });
    }
  }, [blockType, editor]);

  const onChangeBlockMenu = (value: keyof typeof blockTypeToBlockName) => {
    switch (value) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        formatHeading(value);
        break;
      case "code":
        formatCode();
        break;
      case "bullet":
        formatBulletList();
        break;
      case "check":
        formatCheckList();
        break;
      case "number":
        formatNumberedList();
        break;
      case "paragraph":
        formatParagraph();
        break;
      case "quote":
        formatQuote();
        break;
      default:
        throw new Error("invalied Block Type");
    }
  };

  return (
    <Listbox value={blockType} onChange={onChangeBlockMenu}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {blockTypeToBlockName[blockType]}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {Object.keys(blockTypeToBlockName).map((key, index) => {
              const mapKey = key as keyof typeof blockTypeToBlockName;
              return (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={key}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {blockTypeToBlockName[mapKey]}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default BlockFormatDropDown;
