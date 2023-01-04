import React, { useEffect } from "react";
import { useFormContext, useController, useWatch } from "react-hook-form";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { Transition, useWriteContext } from "~/stores/useWirteContext";

// types
import type { FormFieldValues } from "~/routes/create";

const Description = () => {
  const { control, formState } = useFormContext<FormFieldValues>();

  const { setTransition } = useWriteContext();

  const { field } = useController<FormFieldValues, "description">({
    name: "description",
    control,
  });

  const watchDescription = useWatch<FormFieldValues, "description">({
    name: "description",
  });

  const debounced = useDebounceFn(
    (description: string) => {
      setTransition(Transition.UPDATING);
    },
    {
      wait: 200,
      trailing: true,
    }
  );

  useEffect(() => {
    if (!formState.dirtyFields.description) return;
    debounced.run(watchDescription);
  }, [watchDescription, formState.dirtyFields.description]);

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Description</h3>
      <p className="mb-2 text-gray-500">
        The SEO Description will be used in place of your Subtitle on search
        engine results pages. Good SEO descriptions utilize keywords, summarize
        the article and are between 140-156 characters long.
      </p>
      <div className="relative">
        <textarea
          maxLength={156}
          className="focus:shadow-outline h-24 w-full rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-400"
          placeholder="Enter meta description…"
          style={{
            height: "58px !important",
          }}
          {...field}
        />
      </div>
    </div>
  );
};

export default Description;
