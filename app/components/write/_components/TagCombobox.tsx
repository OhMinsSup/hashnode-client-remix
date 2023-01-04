import React, { useCallback, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useDebouncedCallback } from "use-debounce";
import { Transition, useWriteContext } from "~/stores/useWirteContext";

// api
import { getTagListApi } from "~/api/tags/tags";

// hooks
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/create";
import type { MultiValue } from "react-select";
import { scheduleMicrotask } from "~/libs/browser-utils";

const TagCombobox = () => {
  const [inputValue, setInputValue] = useState("");
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const tags = watch("tags");

  const { setTransition } = useWriteContext();

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
        setTransition(Transition.UPDATING);
      });
    },
    [setTransition, setValue]
  );

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Select tags</h3>
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
    </div>
  );
};

export default TagCombobox;
