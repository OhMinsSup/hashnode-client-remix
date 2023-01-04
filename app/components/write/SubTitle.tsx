import React, { useCallback, useEffect } from "react";
import { useFormContext, useController, useWatch } from "react-hook-form";
import { useWriteStore } from "~/stores/useWriteStore";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { Transition, useWriteContext } from "~/stores/useWirteContext";

import { XIcon } from "../ui/Icon";

// types
import type { FormFieldValues } from "~/routes/create";

const SubTitle = () => {
  const { setValue, control, formState } = useFormContext<FormFieldValues>();

  const { visible, closeSubTitle } = useWriteStore();

  const { setTransition } = useWriteContext();

  const { field } = useController<FormFieldValues, "subTitle">({
    name: "subTitle",
    control,
  });

  const watchSubTitle = useWatch<FormFieldValues, "subTitle">({
    name: "subTitle",
  });

  const onClose = useCallback(() => {
    closeSubTitle();
    setValue("subTitle", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [closeSubTitle, setValue]);

  const debounced = useDebounceFn(
    (subTitle: string | undefined) => {
      setTransition(Transition.UPDATING);
    },
    {
      wait: 200,
      trailing: true,
    }
  );

  useEffect(() => {
    if (!formState.dirtyFields.subTitle) return;
    debounced.run(watchSubTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSubTitle, formState.dirtyFields.subTitle]);

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
        {...field}
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
