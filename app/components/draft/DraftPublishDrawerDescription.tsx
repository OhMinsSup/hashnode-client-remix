import React, { useEffect } from "react";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// types
import type { FormFieldValues } from "~/routes/draft";

export default function DraftPublishDrawerDescription() {
  const { register, formState, control } = useFormContext<FormFieldValues>();

  const { changeTransition } = useDraftContext();

  const watchDescription = useWatch<FormFieldValues, "seo.desc">({
    name: "seo.desc",
    control,
  });

  const debounced = useDebounceFn(
    () => {
      changeTransition(Transition.UPDATING);
    },
    {
      wait: 200,
      trailing: true,
    }
  );

  useEffect(() => {
    if (!formState.dirtyFields.seo?.desc) return;
    debounced.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDescription, formState.dirtyFields.seo?.desc]);

  return (
    <>
      <h3 className="title mb-3">SEO Description (Optional)</h3>
      <p className="desc">
        The SEO Description will be used in place of your Subtitle on search
        engine results pages. Good SEO descriptions utilize keywords, summarize
        the article and are between 140-156 characters long.
      </p>
      <div className="relative">
        <textarea
          maxLength={156}
          placeholder="Enter meta description…"
          className="textarea"
          style={{ height: "58px !important" }}
          {...register("seo.desc")}
        ></textarea>
      </div>
    </>
  );
}
