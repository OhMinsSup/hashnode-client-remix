import React, { useEffect } from "react";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext, useWatch } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/draft";

export default function DraftPublishDrawerComment() {
  const { register, formState, control } = useFormContext<FormFieldValues>();

  const watchIsPublic = useWatch<FormFieldValues, "disabledComment">({
    name: "disabledComment",
    control,
  });

  const { changeTransition } = useDraftContext();

  useEffect(() => {
    if (!formState.dirtyFields.disabledComment) return;
    changeTransition(Transition.UPDATING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchIsPublic, formState.dirtyFields.disabledComment]);

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
