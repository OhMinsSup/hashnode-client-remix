import React, { useCallback, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useDebouncedCallback } from "use-debounce";

// api
import { getTagListApi } from "~/api/tags/tags";

// hooks
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/create/story";
import type { MultiValue } from "react-select";

const TagCombobox = () => {
  const [inputValue, setInputValue] = useState("");
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const tags = watch("tags");

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
      console.log(value);
      setValue(
        "tags",
        value.map((item) => item.value),
        { shouldValidate: true, shouldDirty: true }
      );
    },
    [setValue]
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
