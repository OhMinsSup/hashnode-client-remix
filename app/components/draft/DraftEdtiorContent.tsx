import React, { useCallback, useEffect, useRef, useState } from "react";

// hooks
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";

// utils
import { getTargetElement } from "~/libs/browser-utils";

// components
import { Icons } from "../shared/Icons";
import DraftImageCoverPopover from "./DraftImageCoverPopover";

// types
import type { FormFieldValues } from "~/routes/__draft";

const DraftEdtiorContent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [usedSubtitle, setUsedSubTitle] = useState(false);
  const { setFormInstance } = useDraftContext();
  const { register, setValue, clearErrors, watch } =
    useFormContext<FormFieldValues>();

  const watchThumbnail = watch("thumbnail");

  useEffect(() => {
    const $ = getTargetElement(formRef);
    if ($) setFormInstance($);
  }, []);

  const onToggleSubtitle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setUsedSubTitle((prev) => !prev);
      if (e.currentTarget.id === "btn-remove-subtitle") {
        setValue("subTitle", "");
        clearErrors("subTitle");
      }
    },
    [clearErrors, setValue]
  );

  const onRemoveCover = useCallback(() => {
    setValue("thumbnail", null);
    clearErrors("thumbnail");
  }, [clearErrors, setValue]);

  return (
    <div className="draft-editor--content">
      <div className="content-wrapper">
        <form className="content" ref={formRef}>
          <div>
            <div className="editor-toolbar-header">
              <DraftImageCoverPopover />
              {usedSubtitle ? null : (
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
              )}
            </div>
            {watchThumbnail ? (
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
            ) : null}
            <div className="editor-title">
              <textarea
                maxLength={150}
                placeholder="Article Title…"
                id="title-input"
                className="textarea-title"
                style={{ height: "50px !important" }}
                {...register("title")}
              ></textarea>
            </div>
            {usedSubtitle && (
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
            )}
          </div>
          {/* editor content */}
          DraftEdtiorContent
        </form>
      </div>
    </div>
  );
};

export default DraftEdtiorContent;
