import React from "react";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";

interface LexicalContentEditableProps {
  className?: string;
}

const LexicalContentEditable: React.FC<
  React.PropsWithChildren<LexicalContentEditableProps>
> = ({ className }) => {
  return (
    <ContentEditable
      className={className || "ContentEditable__root"}
      data-ContentEditable__root
    />
  );
};

export default LexicalContentEditable;
