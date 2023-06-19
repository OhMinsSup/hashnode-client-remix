import React, { useCallback, useMemo, useState, useTransition } from "react";
import classNames from "classnames";
import unionBy from "lodash-es/unionBy";
import { isEmpty } from "~/utils/assertion";

// components
import ErrorMessage from "../shared/ErrorMessage";
import { Icons } from "../shared/Icons";

// hooks
import { useFetcher, useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";

import type { UserUpdateBody } from "~/api/user/validation/update";
import type { LoadTagsLoader } from "~/routes/_loader._protected.loader.tags[.]json";
import type { TagListRespSchema } from "~/api/schema/resp";

export default function InputTechStack() {
  const [inputValue, setInputValue] = useState("");
  const fetcher = useFetcher<LoadTagsLoader>();
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const { formState } = useFormContext<UserUpdateBody>();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      startTransition(() => {
        fetcher.load(`/loader/tags.json?name=${value}&limit=10`);
      });
    },
    [fetcher]
  );

  const onReset = useCallback(() => {
    setInputValue("");
  }, []);

  return (
    <>
      <label htmlFor="skills" className="input-label">
        Tech Stack
      </label>
      <div className="relative mb-2">
        <input
          type="text"
          className="input-text"
          id="skills"
          data-toggle="dropdown"
          placeholder="Search technologies, topics, more…"
          autoComplete="off"
          value={inputValue}
          onChange={onChange}
        />
        <InputTechStack.Popover
          fetcherData={fetcher.data}
          inputValue={inputValue}
          onReset={onReset}
        />
      </div>
      <InputTechStack.Tags />
      <ErrorMessage
        isSubmitting={false}
        errors={formState.errors}
        name="skills"
      />
    </>
  );
}

interface PopoverProps {
  inputValue: string;
  onReset: () => void;
  fetcherData: TagListRespSchema | undefined;
}

InputTechStack.Popover = function Popover({
  inputValue,
  onReset,
  fetcherData,
}: PopoverProps) {
  const { setValue, watch } = useFormContext<UserUpdateBody>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchSkills = watch("skills") ?? [];

  const unionSkills = useMemo(() => {
    const _data: string[] = [];
    if (watchSkills.length) {
      _data.push(...watchSkills);
    }
    if (fetcherData) {
      const { list } = fetcherData;
      _data.push(...list.map((tag) => tag.name));
    }
    if (inputValue) {
      _data.push(inputValue);
    }
    return unionBy(_data, (item) => item);
  }, [fetcherData, inputValue, watchSkills]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const dataValue = e.currentTarget.dataset.value;
      if (dataValue) {
        const _skills = [...watchSkills];
        const index = _skills.indexOf(dataValue);
        if (index === -1) {
          _skills.push(dataValue);
        } else {
          _skills.splice(index, 1);
        }
        setValue("skills", _skills, {
          shouldValidate: true,
          shouldDirty: true,
        });
        onReset();
      }
    },
    [onReset, setValue, watchSkills]
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
      {unionSkills.map((tag, index) => (
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

InputTechStack.Tags = function Tags() {
  const { setValue, watch } = useFormContext<UserUpdateBody>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchSkills = watch("skills") ?? [];

  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
      e.preventDefault();
      const _skills = [...watchSkills];
      const index = _skills.indexOf(value);
      if (index !== -1) {
        _skills.splice(index, 1);
        setValue("skills", _skills, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue, watchSkills]
  );

  if (isEmpty(watchSkills)) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap">
      {watchSkills.map((tag, index) => (
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
