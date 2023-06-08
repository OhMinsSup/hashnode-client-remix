import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import type { FormFieldValues } from "~/routes/_draft";
import { Icons } from "../shared/Icons";
import { useDraftContext } from "~/context/useDraftContext";

export default function DraftEditorSubtitle() {
  const { toggleSubTitle, visibility } = useDraftContext();

  const { register, setValue, clearErrors } = useFormContext<FormFieldValues>();

  const onToggleSubtitle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      toggleSubTitle(false);
      setValue("subTitle", "");
      clearErrors("subTitle");
    },
    [clearErrors, toggleSubTitle, setValue]
  );

  if (!visibility.usedSubTitle) {
    return null;
  }

  return (
    <div className="editor-subtitle">
      <textarea
        maxLength={130}
        placeholder="Article Subtitle…"
        id="subtitle-input"
        className="textarea-subtitle"
        style={{ height: "33px !important" }}
        {...register("subTitle")}
      ></textarea>
      <button
        type="button"
        id="btn-remove-subtitle"
        className="btn-close__subtitle"
        title="Remove Subtitle"
        onClick={onToggleSubtitle}
      >
        <Icons.X className="icon__base fill-current" />
      </button>
    </div>
  );
}

DraftEditorSubtitle.Button = function DraftEditorSubtitleButton() {
  const { toggleSubTitle, visibility } = useDraftContext();

  const onToggleSubtitle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      toggleSubTitle(true);
    },
    [toggleSubTitle]
  );

  if (visibility.usedSubTitle) {
    return null;
  }

  return (
    <button
      type="button"
      id="btn-add-subtitle"
      className="btn-toolbar"
      title="Add Subtitle"
      onClick={onToggleSubtitle}
    >
      <Icons.SubTitle className="icon__base mr-2 stroke-current" />
      <span>Add Subtitle</span>
    </button>
  );
};
