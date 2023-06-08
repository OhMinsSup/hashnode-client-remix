import React, { useCallback } from "react";
import { Icons } from "../shared/Icons";
import { useFormContext } from "react-hook-form";
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftEditorCover() {
  const { setValue, clearErrors, watch } = useFormContext<FormFieldValues>();

  const watchThumbnail = watch("thumbnail");

  const onRemoveCover = useCallback(() => {
    setValue("thumbnail", null);
    clearErrors("thumbnail");
  }, [clearErrors, setValue]);

  if (!watchThumbnail) {
    return null;
  }

  return (
    <div className="editor-cover">
      <div
        className="editor-cover__container"
        style={{
          backgroundImage: `url("${watchThumbnail.url}")`,
        }}
      >
        <div className="editor-cover__controls">
          <button
            type="button"
            id="btn-remove-cover"
            className="ml-2 flex flex-row items-center justify-center rounded border-2 border-transparent  bg-white px-4 py-2 text-slate-900 opacity-75"
            title="Remove Cover"
            onClick={onRemoveCover}
          >
            <Icons.X className="icon__base fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}
