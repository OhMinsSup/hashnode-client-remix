import React, { useCallback, useEffect, useState } from "react";

// components
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Icons } from "../shared/Icons";
import AsyncCreatableSelect from "react-select/async-creatable";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// utils
import { scheduleMicrotask } from "~/libs/browser-utils";

// api
import { getTagListApi } from "~/api/tags/tags";

// types
import type { FormFieldValues } from "~/routes/__draft";
import type { MultiValue } from "react-select";

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
        <button type="button" className="btn-submit">
          Publish
        </button>
      </div>
      <ScrollArea.Root className="drawer-content">
        <ScrollArea.Viewport className="h-full w-full">
          <InternalDraftPublishDrawer.Container>
            <InternalDraftPublishDrawer.Tags />
          </InternalDraftPublishDrawer.Container>
          <InternalDraftPublishDrawer.Container>
            <InternalDraftPublishDrawer.Title />
          </InternalDraftPublishDrawer.Container>
          <InternalDraftPublishDrawer.Container>
            <InternalDraftPublishDrawer.Description />
          </InternalDraftPublishDrawer.Container>
          <InternalDraftPublishDrawer.Container>
            <InternalDraftPublishDrawer.Schedule />
          </InternalDraftPublishDrawer.Container>
          <InternalDraftPublishDrawer.Container>
            <InternalDraftPublishDrawer.Comment />
          </InternalDraftPublishDrawer.Container>
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

interface Props {
  children: React.ReactNode;
}

InternalDraftPublishDrawer.Container = function DraftPublishDrawerContainer({
  children,
}: Props) {
  return <div className="px-5 pt-4 pb-5">{children}</div>;
};

InternalDraftPublishDrawer.Tags = function DraftPublishDrawerTags() {
  const [inputValue, setInputValue] = useState("");
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const tags = watch("tags");

  const { changeTransition } = useDraftContext();

  const loadOptions = useDebouncedCallback(async (inputValue) => {
    const { result } = await getTagListApi({
      name: inputValue,
      limit: 10,
    });
    const list = result?.result?.list ?? [];
    return list.map((tag) => ({
      label: tag.name,
      value: tag.name,
    }));
  }, 250);

  const onChangeTags = useCallback(
    (value: MultiValue<any>) => {
      const tags = value.map((item) => item.value);
      setValue("tags", tags, { shouldValidate: true, shouldDirty: true });
      scheduleMicrotask(() => {
        changeTransition(Transition.UPDATING);
      });
    },
    [changeTransition, setValue]
  );

  return (
    <>
      <h3 className="title mb-3">Select tags</h3>
      <div className="relative">
        <AsyncCreatableSelect
          inputValue={inputValue}
          isClearable
          cacheOptions
          isMulti
          loadOptions={loadOptions}
          onChange={onChangeTags}
          onInputChange={(newValue) => setInputValue(newValue)}
          value={tags?.map((tag) => ({ label: tag, value: tag }))}
        />
      </div>
    </>
  );
};

InternalDraftPublishDrawer.Title = function DraftPublishDrawerTitle() {
  return (
    <>
      <h3 className="title mb-3">SEO TITLE (OPTIONAL)</h3>
      <p className="desc">
        The "SEO Title" will be shown in place of your Title on search engine
        results pages, such as a Google search. SEO titles between 40 and 50
        characters with commonly searched words have the best
        click-through-rates.
      </p>
      <div className="relative">
        <textarea
          name="seoTitle"
          maxLength={70}
          placeholder="Enter meta title"
          className="textarea"
          style={{ height: "58px !important" }}
        ></textarea>
      </div>
    </>
  );
};

InternalDraftPublishDrawer.Description =
  function DraftPublishDrawerDescription() {
    const { register, formState, control } = useFormContext<FormFieldValues>();

    const { changeTransition } = useDraftContext();

    const watchDescription = useWatch<FormFieldValues, "description">({
      name: "description",
      control,
    });

    const debounced = useDebounceFn(
      (description: string) => {
        changeTransition(Transition.UPDATING);
      },
      {
        wait: 200,
        trailing: true,
      }
    );

    useEffect(() => {
      if (!formState.dirtyFields.description) return;
      debounced.run(watchDescription);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchDescription, formState.dirtyFields.description]);

    return (
      <>
        <h3 className="title mb-3">SEO Description (Optional)</h3>
        <p className="desc">
          The SEO Description will be used in place of your Subtitle on search
          engine results pages. Good SEO descriptions utilize keywords,
          summarize the article and are between 140-156 characters long.
        </p>
        <div className="relative">
          <textarea
            maxLength={156}
            placeholder="Enter meta description…"
            className="textarea"
            style={{ height: "58px !important" }}
            {...register("description")}
          ></textarea>
        </div>
      </>
    );
  };

InternalDraftPublishDrawer.Schedule = function DraftPublishDrawerSchedule() {
  const { setValue, register, formState, control } =
    useFormContext<FormFieldValues>();

  const { changeTransition } = useDraftContext();

  const publishingDate = useWatch<FormFieldValues, "publishingDate">({
    name: "publishingDate",
    control,
  });

  const hasPublishedTime = useWatch<FormFieldValues, "hasPublishedTime">({
    name: "hasPublishedTime",
    control,
  });

  const onRemoveSchedule = useCallback(() => {
    const options = {
      shouldDirty: true,
      shouldTouch: true,
    };
    setValue("hasPublishedTime", false, options);
    setValue("publishingDate", undefined, options);
  }, [setValue]);

  const onSetSchedule = useCallback(() => {
    setValue("hasPublishedTime", true, {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  useEffect(() => {
    if (!formState.dirtyFields.publishingDate) return;
    changeTransition(Transition.UPDATING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishingDate, formState.dirtyFields.publishingDate]);

  return (
    <>
      <h3 className="title mb-3">SCHEDULE YOUR ARTICLE</h3>
      <p className="desc">
        Select a publishing date/time (Based on your local time zone)
      </p>
      <div className="mb-3">
        {hasPublishedTime ? (
          <>
            <div className="flex w-full flex-row items-center justify-between rounded-lg border bg-gray-50 p-4 text-base text-gray-900 outline-none">
              <input
                type="datetime-local"
                className="flex-1 bg-gray-50"
                {...register("publishingDate", { valueAsDate: true })}
              />
            </div>
            <button
              type="button"
              className="schedule__button-close"
              onClick={onRemoveSchedule}
            >
              Cancel scheduling
            </button>
          </>
        ) : (
          <button
            type="button"
            className="schedule__button"
            onClick={onSetSchedule}
          >
            <Icons.Schedule className="icon__base mr-2 fill-current" />
            <span>Select a date</span>
          </button>
        )}
      </div>
    </>
  );
};

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

const DraftPublishDrawer = () => {
  const { visibility } = useDraftContext();

  if (!visibility.isPublishVisible) {
    return null;
  }

  return (
    <div className="drawer__draft">
      <InternalDraftPublishDrawer />
    </div>
  );
};

export default DraftPublishDrawer;
