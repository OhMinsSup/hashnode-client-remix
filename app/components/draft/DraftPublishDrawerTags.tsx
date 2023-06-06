import React, { startTransition, useCallback, useMemo, useState } from "react";
import unionBy from "lodash-es/unionBy";

// components

// hooks
import { useFetcher, useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/draft";
import type { LoadTagsLoader } from "~/routes/settings.loader.tags[.]json";
import classNames from "classnames";
import { isEmpty } from "~/utils/assertion";
import { Icons } from "../shared/Icons";

export default function DraftPublishDrawerTags() {
  const [inputValue, setInputValue] = useState("");
  const { formState } = useFormContext<FormFieldValues>();
  const fetcher = useFetcher<LoadTagsLoader>();
  const navigation = useNavigation();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const onReset = useCallback(() => {
    setInputValue("");
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      startTransition(() => {
        fetcher.load(`/settings/loader/tags.json?name=${value}&limit=10`);
      });
    },
    [fetcher]
  );

  return (
    <>
      <h3 className="title mb-3">Select tags</h3>
      <div className="relative">
        <input
          type="text"
          className="input-text mb-2"
          id="tags"
          data-toggle="dropdown"
          placeholder="Search technologies, topics, more…"
          autoComplete="off"
          value={inputValue}
          onChange={onChange}
        />
        <DraftPublishDrawerTags.Popover
          inputValue={inputValue}
          onReset={onReset}
        />
      </div>
      <DraftPublishDrawerTags.Tags />
    </>
  );
}

interface PopoverProps {
  inputValue: string;
  onReset: () => void;
}

DraftPublishDrawerTags.Popover = function Popover({
  inputValue,
  onReset,
}: PopoverProps) {
  const fetcher = useFetcher<LoadTagsLoader>();
  const { setValue, watch } = useFormContext<FormFieldValues>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchTags = watch("tags") ?? [];

  const unionTags = useMemo(() => {
    const _data: string[] = [];
    if (watchTags.length) {
      _data.push(...watchTags);
    }
    if (fetcher.data) {
      const { list } = fetcher.data;
      _data.push(...list.map((tag) => tag.name));
    }
    if (inputValue) {
      _data.push(inputValue);
    }
    return unionBy(_data, (item) => item);
  }, [fetcher.data, inputValue, watchTags]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const dataValue = e.currentTarget.dataset.value;
      if (dataValue) {
        const _tags = [...watchTags];
        const index = _tags.indexOf(dataValue);
        if (index === -1) {
          _tags.push(dataValue);
        } else {
          _tags.splice(index, 1);
        }
        setValue("tags", _tags, {
          shouldValidate: true,
          shouldDirty: true,
        });
        onReset();
      }
    },
    [onReset, setValue, watchTags]
  );

  return (
    <div
      className={classNames(
        "top-100 absolute right-0 z-10 h-auto w-full rounded-lg bg-white shadow-lg",
        {
          hidden: !inputValue,
        }
      )}
    >
      {unionTags.map((tag, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={`popover-${tag}-${index}`}
          className="flex flex-row items-center px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 "
          href="#"
          data-index={index}
          data-value={tag}
          onClick={onClick}
        >
          {tag}
        </a>
      ))}
    </div>
  );
};

DraftPublishDrawerTags.Tags = function Tags() {
  const { setValue, watch } = useFormContext<FormFieldValues>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchTags = watch("tags") ?? [];

  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
      e.preventDefault();
      const _skills = [...watchTags];
      const index = _skills.indexOf(value);
      if (index !== -1) {
        _skills.splice(index, 1);
        setValue("tags", _skills, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue, watchTags]
  );

  if (isEmpty(watchTags)) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap">
      {watchTags.map((tag, index) => (
        <div
          key={`tag-${tag}-${index}`}
          className="button-primary small mb-2 mr-2 flex flex-row items-center"
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="mr-2">
            <span>{tag}</span>
          </a>
          <button
            data-index={index}
            type="button"
            onClick={(e) => onRemove(e, tag)}
          >
            <Icons.X className="h-4 w-4 fill-current" />
          </button>
        </div>
      ))}
    </div>
  );
};
