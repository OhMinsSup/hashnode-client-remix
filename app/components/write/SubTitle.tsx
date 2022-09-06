import React, { useCallback } from "react";
import { useSubTitleAtom } from "~/atoms/editorAtom";
import { XIcon } from "../ui/Icon";

const SubTitle = () => {
  const [subTitleState, setVisibleBySubTitle] = useSubTitleAtom();

  const onChagne = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setVisibleBySubTitle((old) => ({
        ...old,
        subTitle: e.target.value,
      }));
    },
    [setVisibleBySubTitle]
  );

  const onClose = useCallback(() => {
    setVisibleBySubTitle({
      visible: false,
      subTitle: "",
    });
  }, [setVisibleBySubTitle]);

  if (!subTitleState.visible) return null;

  return (
    <div className="relative mb-4 mt-[-1.25rem]">
      <textarea
        maxLength={150}
        placeholder="Article title…"
        className="bg-transparen w-full resize-none appearance-none pr-10 pl-4 font-medium text-gray-700 outline-none"
        spellCheck="false"
        onChange={onChagne}
        style={{
          fontSize: "1.5rem",
          lineHeight: "1.375",
        }}
      ></textarea>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 inline-flex flex-row items-center justify-center rounded-full border border-transparent py-1 px-2 text-center text-sm font-medium text-gray-700 outline-none"
      >
        <XIcon className="h-5 w-5 fill-current" />
      </button>
    </div>
  );
};

export default SubTitle;
