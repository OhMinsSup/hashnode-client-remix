import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useWriteStore } from "~/stores/useWriteStore";
import { XIcon } from "../ui/Icon";

const SubTitle = () => {
  const { register, setValue } = useFormContext();

  const { visible, closeSubTitle } = useWriteStore();

  const onClose = useCallback(() => {
    closeSubTitle();
    setValue("subTitle", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [closeSubTitle, setValue]);

  if (!visible.subTitle) return null;

  return (
    <div className="relative mb-4 mt-[-1.25rem]">
      <textarea
        maxLength={150}
        placeholder="Article title…"
        className="bg-transparen w-full resize-none appearance-none pr-10 pl-4 font-medium text-gray-700 outline-none"
        spellCheck="false"
        style={{
          fontSize: "1.5rem",
          lineHeight: "1.375",
        }}
        {...register("subTitle")}
      />
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
