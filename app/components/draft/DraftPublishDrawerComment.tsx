import React from "react";

// hooks
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftPublishDrawerComment() {
  const { register } = useFormContext<FormFieldValues>();
  return (
    <>
      <h3 className="title mb-3">DISABLE COMMENTS?</h3>
      <p className="desc">
        This will hide the comments section below your article.
      </p>
      <div>
        <div className="checkbox">
          <label htmlFor="comments" className="checkbox__label">
            <input
              type="checkbox"
              id="comments"
              className="checkbox__input"
              {...register("disabledComment")}
            />
            <span>Yes</span>
          </label>
        </div>
      </div>
    </>
  );
}
