import React, { useCallback, useEffect, useRef, useState } from "react";

// hooks
import { useFormContext } from "react-hook-form";
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// utils
import { getTargetElement, scheduleMicrotask } from "~/libs/browser-utils";

// components
import { Icons } from "../shared/Icons";
import DraftImageCoverPopover from "./DraftImageCoverPopover";
import Editor from "../shared/Editor";

// types
import type { FormFieldValues } from "~/routes/__draft";

const DraftEdtiorContent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [usedSubtitle, setUsedSubTitle] = useState(false);
  const { setFormInstance, changeTransition, setEditorJSInstance, $editorJS } =
    useDraftContext();
  const { register, setValue, clearErrors, watch, formState } =
    useFormContext<FormFieldValues>();

  const watchThumbnail = watch("thumbnail");
  const watchSubTitle = watch("subTitle");
  const watchTitle = watch("title");

  useEffect(() => {
    const $ = getTargetElement(formRef);
    if ($) setFormInstance($);
  }, []);

  const syncEditorContent = useCallback(async () => {
    const blocks = await $editorJS?.save();
    const data = JSON.stringify(blocks);

    setValue("content", data, {
      shouldDirty: true,
      shouldValidate: true,
    });

    return data;
  }, [$editorJS, setValue]);

  const onChangeEditor = useCallback(async () => {
    await syncEditorContent();
    changeTransition(Transition.UPDATING);
  }, [changeTransition, syncEditorContent]);

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
    scheduleMicrotask(() => {
      changeTransition(Transition.UPDATING);
    });
  }, [clearErrors, setValue]);

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
    if (!formState.dirtyFields.title) return;
    debounced.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTitle, formState.dirtyFields.title]);

  useEffect(() => {
    if (!formState.dirtyFields.subTitle) return;
    debounced.run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSubTitle, formState.dirtyFields.subTitle]);

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
          <div className="relative z-20">
            <Editor onReady={setEditorJSInstance} onChange={onChangeEditor} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DraftEdtiorContent;
