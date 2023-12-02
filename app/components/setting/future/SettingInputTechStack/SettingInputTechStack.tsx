import React, { useCallback, useMemo, useState, useTransition } from "react";
import unionBy from "lodash-es/unionBy";
import styles from "./styles.module.css";

import { useFetcher, useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { Icons } from "~/components/shared/Icons";
import { ErrorMessage } from "~/components/shared/future/ErrorMessage";

import { isEmpty } from "~/utils/assertion";
import { getPath } from "~/routes/_loader._protected.loader.tags[.]json";

import type { FormFieldValues } from "~/services/validate/user-update-api.validate";
import type { Loader } from "~/routes/_loader._protected.loader.tags[.]json";

export default function SettingInputTechStack() {
  const [inputValue, setInputValue] = useState("");
  const fetcher = useFetcher<Loader>();
  const [, startTransition] = useTransition();
  const navigation = useNavigation();

  const { formState } = useFormContext<FormFieldValues>();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      startTransition(() => {
        fetcher.load(getPath({ name: value, limit: 10 }));
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
        {/* <SettingInputTechStack.Popover
          fetcherData={fetcher.data}
          inputValue={inputValue}
          onReset={onReset}
        /> */}
      </div>
      <SettingInputTechStack.Tags />
      <ErrorMessage
        isSubmitting={isSubmitting}
        errors={formState.errors}
        name="skills"
      />
    </>
  );
}

interface PopoverProps {
  inputValue: string;
  onReset: () => void;
  fetcherData: FetchRespSchema.TagListRespSchema | undefined;
}

SettingInputTechStack.Popover = function Popover({
  inputValue,
  onReset,
  fetcherData,
}: PopoverProps) {
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const watchSkills = watch("skills");

  const unionSkills = useMemo(() => {
    const _data: string[] = [];
    if (watchSkills?.length) {
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
        const _skills = [...(watchSkills ?? [])];
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
    <div className={styles.popover}>
      {unionSkills.map((tag, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={`popover-${tag}-${index}`}
          className={styles.popover_item}
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

SettingInputTechStack.Tags = function Tags() {
  const { setValue, watch } = useFormContext<FormFieldValues>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchSkills = watch("skills") ?? [];

  console.log("watchSkills", watchSkills);

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
          className="button-primary small mr-2 mb-2 flex flex-row items-center"
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
            <Icons.V2.SettingTagX className="h-4 w-4 fill-current" />
          </button>
        </div>
      ))}
    </div>
  );
};
