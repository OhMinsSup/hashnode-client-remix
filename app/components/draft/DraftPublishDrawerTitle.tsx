import React from "react";

// hooks
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftPublishDrawerTitle() {
  const { register } = useFormContext<FormFieldValues>();

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
