import React, { useCallback, useState } from "react";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Combobox, Transition } from "@headlessui/react";
import SelectComboboxTagItem from "./SelectComboboxTagItem";

// api
import { getTagListApi } from "~/api/tags";
import { isEmpty } from "~/utils/assertion";

// hooks
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useFieldArray, useFormContext } from "react-hook-form";

// types
import type { TagWithPostCountSchema } from "~/api/schema/resp";
import { generateUniqueId } from "~/utils/util";

const TagCombobox = () => {
  const { control } = useFormContext();

  const { append, fields } = useFieldArray({
    control,
    name: "tags",
    keyName: "key",
  });

  const [query, setQuery] = useState("");
  const [autoCompleteTags, setAutoCompleteTags] = useState<
    TagWithPostCountSchema[]
  >([]);

  const action = useDebounceFn(
    async (tagName: string) => {
      setQuery(tagName);

      if (isEmpty(tagName)) {
        setAutoCompleteTags([]);
        return;
      }
      const { result } = await getTagListApi({
        name: tagName,
        limit: 10,
      });
      const list = result?.result?.list ?? [];
      setAutoCompleteTags(list);
      return;
    },
    {
      wait: 1000,
    }
  );

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      action.run(e.target.value);
    },
    [action]
  );

  const onResetQuery = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  const onChangeTags = useCallback(
    (tags: any[]) => {
      console.log(tags);
      const tag = tags.at(0);
      console.log("onChangeTags", tag);
      if (!tag) return;
      // @ts-ignore
      const index = fields.findIndex((tag) => tag.name === tag);
      if (index === -1) {
        const id = generateUniqueId();
        append({ id, name: tag });
        return;
      }
    },
    [append, fields]
  );

  const renderOptions = useCallback((name: string, id: number) => {
    return (
      <Combobox.Option
        key={id}
        className={({ active }) =>
          `relative cursor-default select-none py-2 pl-10 pr-4 ${
            active ? "bg-blue-600 text-white" : "text-gray-900"
          }`
        }
        value={name}
      >
        {({ selected, active }) => (
          <>
            <span
              className={`block truncate ${
                selected ? "font-medium" : "font-normal"
              }`}
            >
              {name}
            </span>
            {selected ? (
              <span
                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                  active ? "text-white" : "text-blue-600"
                }`}
              >
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            ) : null}
          </>
        )}
      </Combobox.Option>
    );
  }, []);

  const ComboboxTags = useCallback(() => {
    if (isEmpty(autoCompleteTags)) {
      return renderOptions(query, -1);
    }

    return (
      <>
        {autoCompleteTags.map((tag) => {
          return (
            <React.Fragment key={`auto-complete-tags-${tag.id}`}>
              {renderOptions(tag.name, tag.id)}
            </React.Fragment>
          );
        })}
      </>
    );
  }, [autoCompleteTags, query, renderOptions]);

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Select tags</h3>
      <div className="relative">
        <Combobox value={fields} onChange={onChangeTags} multiple>
          <div className="relative my-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0"
                onChange={onChangeInput}
                value={query}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </Combobox.Button>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={onResetQuery}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxTags />
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="flex flex-wrap gap-1">
          {fields.map((item: any) => (
            <React.Fragment key={`fixed-tag-item-${item.key}`}>
              <SelectComboboxTagItem
                fieldkey={item.key}
                id={item.id}
                name={item.name}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagCombobox;
