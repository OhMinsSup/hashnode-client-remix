import React, { useEffect } from "react";
import { useFormContext, useController, useWatch } from "react-hook-form";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// types
import type { FormFieldValues } from "~/routes/create";

const Title = () => {
  const { control } = useFormContext<FormFieldValues>();

  const { field } = useController<FormFieldValues, "title">({
    name: "title",
    control,
  });

  const watchTitle = useWatch<FormFieldValues, "title">({
    name: "title",
  });

  const debounced = useDebounceFn(
    (title: string) => {
      console.log("debounce", title);
    },
    {
      wait: 200,
      trailing: true,
    }
  );

  useEffect(() => {
    debounced.run(watchTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTitle]);

  return (
    <div style={{ lineHeight: "1.375" }}>
      <textarea
        maxLength={150}
        placeholder="Article title…"
        className="mb-5 mt-2 h-[86px] w-full resize-none appearance-none overflow-hidden bg-transparent px-4 font-sans text-3xl font-extrabold text-gray-900 outline-none md:text-4xl"
        spellCheck="false"
        {...field}
      />
    </div>
  );
};

export default Title;
