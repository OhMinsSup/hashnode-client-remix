import React from "react";

// hooks
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/draft";

export default function DraftPublishDrawerDescription() {
  const { register } = useFormContext<FormFieldValues>();

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
