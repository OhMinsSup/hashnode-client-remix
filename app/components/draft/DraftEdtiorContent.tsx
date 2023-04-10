import React, { useCallback, useEffect, useState } from "react";

// hooks
import { useFormContext } from "react-hook-form";
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// utils
import { scheduleMicrotask } from "~/libs/browser-utils";

// components
import { Icons } from "~/components/shared/Icons";
import DraftImageCoverPopover from "./DraftImageCoverPopover";
import Editor from "~/components/shared/Editor";
import { ClientOnly } from "remix-utils";

// types
import type { API } from "@editorjs/editorjs";
import type { FormFieldValues } from "~/routes/draft";

const DraftEdtiorContent = () => {
  // const $form = useRef<HTMLFormElement>(null);
  const [usedSubtitle, setUsedSubTitle] = useState(false);

  const ctx = useDraftContext();

  const methods = useFormContext<FormFieldValues>();

  const { register, setValue, clearErrors, watch, formState } = methods;

  const watchThumbnail = watch("thumbnail");
  const watchSubTitle = watch("subTitle");
  const watchTitle = watch("title");

  // useEffect(() => {
  //   const $ = getTargetElement($form);
  //   if ($) ctx.setFormInstance($);
  // }, []);

  const onChangeEditor = useCallback(
    async (api: API) => {
      const blocks = await api.saver.save();
      if (!blocks) return;
      const data = JSON.stringify(blocks);

      setValue("content", data, {
        shouldDirty: true,
        shouldValidate: true,
      });

      scheduleMicrotask(() => {
        ctx.changeTransition(Transition.UPDATING);
      });

      return data;
    },
    [ctx.changeTransition, setValue]
  );

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
      ctx.changeTransition(Transition.UPDATING);
    });
  }, [clearErrors, ctx.changeTransition, setValue]);

  const debounced = useDebounceFn(
    () => {
      ctx.changeTransition(Transition.UPDATING);
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
        <div className="content">
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
          <div className="relative z-20 px-4">
            <ClientOnly>
              {() => (
                <Editor
                  onReady={ctx.setEditorJSInstance}
                  onChange={onChangeEditor}
                />
              )}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEdtiorContent;
