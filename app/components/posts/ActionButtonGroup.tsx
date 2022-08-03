import React from "react";
import { ImageIcon, TypographyIcon } from "../ui/Icon";
import { ActionButton } from "./_components";

const ActionButtonGroup = () => {
  return (
    <div className="relative mb-10 flex flex-row items-center">
      <ActionButton
        icon={<ImageIcon className="mr-2 h-5 w-5 fill-current" />}
        text="Add Cover"
        aria-label="add post cover image"
        aria-haspopup="dialog"
      />
      <ActionButton
        icon={<TypographyIcon className="mr-2 h-5 w-5 fill-current" />}
        text="Add Subtitle"
        aria-label="add post sub title"
        aria-haspopup="false"
      />
    </div>
  );
};

export default ActionButtonGroup;
