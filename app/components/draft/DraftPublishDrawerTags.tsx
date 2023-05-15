import React, { useCallback, useState } from "react";

// components
import AsyncCreatableSelect from "react-select/async-creatable";

// hooks
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

// utils
import { scheduleMicrotask } from "~/libs/browser-utils";

// api
import { getTagListApi } from "~/api/tags/tagList";

// types
import type { FormFieldValues } from "~/routes/draft";
import type { MultiValue } from "react-select";

export default function DraftPublishDrawerTags() {
  const [inputValue, setInputValue] = useState("");
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const tags = watch("tags");

  const { changeTransition } = useDraftContext();

  const loadOptions = useDebouncedCallback(async (inputValue) => {
    const { json } = await getTagListApi({
      name: inputValue,
      limit: 10,
    });
    const list = json?.result?.list ?? [];
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
}
