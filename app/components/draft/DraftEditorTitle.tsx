import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftEditorTitle() {
  const { register } = useFormContext<FormFieldValues>();

  return (
    <div className="editor-title">
      <textarea
        maxLength={150}
        placeholder="Article Title…"
        id="title-input"
        className="textarea-title"
        style={{ height: "50px !important" }}
        {...register("title")}
      />
    </div>
  );
}
