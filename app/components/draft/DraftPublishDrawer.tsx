import React, { useCallback, useEffect } from "react";

// components
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Icons } from "~/components/shared/Icons";
import DraftPublishDrawerContainer from "./DraftPublishDrawerContainer";
import DraftPublishDrawerTags from "./DraftPublishDrawerTags";
import DraftPublishDrawerTitle from "./DraftPublishDrawerTitle";
import DraftPublishDrawerDescription from "./DraftPublishDrawerDescription";
import DraftPublishDrawerSchedule from "./DraftPublishDrawerSchedule";
import DraftPublishDrawerComment from "./DraftPublishDrawerComment";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext, useWatch } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/draft";

function InternalDraftPublishDrawer() {
  const { togglePublish } = useDraftContext();

  const onClose = useCallback(() => {
    togglePublish(false);
  }, [togglePublish]);

  return (
    <div className="drawer-container">
      <div className="drawer-header">
        <button type="button" className="btn-close" onClick={onClose}>
          <Icons.X className="icon__base mr-2 fill-current" />
          <span>Close</span>
        </button>
        <button type="submit" className="btn-submit">
          Publish
        </button>
      </div>
      <ScrollArea.Root className="drawer-content">
        <ScrollArea.Viewport className="h-full w-full">
          <DraftPublishDrawerContainer>
            <DraftPublishDrawerTags />
          </DraftPublishDrawerContainer>
          <DraftPublishDrawerContainer>
            <DraftPublishDrawerTitle />
          </DraftPublishDrawerContainer>
          <DraftPublishDrawerContainer>
            <DraftPublishDrawerDescription />
          </DraftPublishDrawerContainer>
          <DraftPublishDrawerContainer>
            <DraftPublishDrawerSchedule />
          </DraftPublishDrawerContainer>
          <DraftPublishDrawerContainer>
            <DraftPublishDrawerComment />
          </DraftPublishDrawerContainer>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </div>
  );
}

InternalDraftPublishDrawer.Comment = function DraftPublishDrawerComment() {
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
};

export default function DraftPublishDrawer() {
  const { visibility } = useDraftContext();

  if (!visibility.isPublishVisible) {
    return null;
  }

  return (
    <div className="drawer__draft">
      <InternalDraftPublishDrawer />
    </div>
  );
}
