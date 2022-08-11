import React, { useCallback } from "react";
import { getLanguageFriendlyName, $isCodeNode } from "@lexical/code";
import { DropDown, DropDownItem } from "../../Shared";
import { CODE_LANGUAGE_OPTIONS } from "../_plugins/ToolbarPlugin";
import { $getNodeByKey, type LexicalEditor, type NodeKey } from "lexical";
import classNames from "classnames";

interface CodeLanguageDropDownProps {
  codeLanguage: string;
  editor: LexicalEditor;
  selectedElementKey: NodeKey | null;
}

const CodLanguageDropDown: React.FC<CodeLanguageDropDownProps> = ({
  codeLanguage,
  selectedElementKey,
  editor,
}) => {
  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  return (
    <DropDown
      buttonClassName="toolbar-item code-language"
      buttonLabel={getLanguageFriendlyName(codeLanguage)}
      buttonAriaLabel="Select language"
    >
      {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
        return (
          <DropDownItem
            className={classNames("item", {
              "active dropdown-item-active": value === codeLanguage,
            })}
            onClick={() => onCodeLanguageSelect(value)}
            key={value}
          >
            <span className="text">{name}</span>
          </DropDownItem>
        );
      })}
    </DropDown>
  );
};

export default CodLanguageDropDown;
