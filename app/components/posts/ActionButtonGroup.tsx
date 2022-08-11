import React, { useCallback } from "react";
import { useSubTitleAtom } from "~/atoms/editorAtom";
import { ImageIcon, TypographyIcon } from "../ui/Icon";
import { ActionButton } from "./_components";

const ActionButtonGroup = () => {
  const [subTitleState, setVisibleBySubTitle] = useSubTitleAtom();

  const onClickBySubTitle = useCallback(() => {
    setVisibleBySubTitle((old) => ({
      ...old,
      visible: !old.visible,
    }));
  }, [setVisibleBySubTitle]);

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
        aria-haspopup={subTitleState.visible ? "true" : "false"}
        onPress={onClickBySubTitle}
      />
    </div>
  );
};

export default ActionButtonGroup;
