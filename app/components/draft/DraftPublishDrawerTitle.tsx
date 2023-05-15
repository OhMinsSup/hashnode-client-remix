import React, { useEffect } from "react";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// types
import type { FormFieldValues } from "~/routes/draft";

export default function DraftPublishDrawerTitle() {
  const { register, formState, control } = useFormContext<FormFieldValues>();

  const { changeTransition } = useDraftContext();

  const watchTitle = useWatch<FormFieldValues, "seo.title">({
    name: "seo.title",
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
    if (!formState.dirtyFields.seo?.title) return;
    debounced.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTitle, formState.dirtyFields.seo?.title]);

  return (
    <>
      <h3 className="title mb-3">SEO TITLE (OPTIONAL)</h3>
      <p className="desc">
        The "SEO Title" will be shown in place of your Title on search engine
        results pages, such as a Google search. SEO titles between 40 and 50
        characters with commonly searched words have the best
        click-through-rates.
      </p>
      <div className="relative">
        <textarea
          maxLength={70}
          placeholder="Enter meta title"
          className="textarea"
          style={{ height: "58px !important" }}
          {...register("seo.title")}
        ></textarea>
      </div>
    </>
  );
}
