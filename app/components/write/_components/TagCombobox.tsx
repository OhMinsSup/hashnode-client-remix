import React, { useCallback, useMemo, useState } from "react";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Combobox, Transition } from "@headlessui/react";

import { useQuery } from "@tanstack/react-query";
import { useDebounceEffect } from "~/libs/hooks/useDebounceFn";
import { getTagListApi } from "~/api/tags";

import { QUERIES_KEY } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

const TagCombobox = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data } = useQuery(
    QUERIES_KEY.TAGS.ROOT(keyword),
    async ({ queryKey }) => {
      const name = queryKey?.[1];
      const { result } = await getTagListApi({
        name,
        limit: 10,
      });
      return result.result;
    }
  );

  const list = useMemo(() => {
    const result = data?.list ?? [];
    if (isEmpty(result)) {
      return tags.map((tag, index) => ({ id: index - 1, name: tag }));
    }
    return result;
  }, [data, tags]);

  console.log("list", list);
  console.log("tags", tags);

  useDebounceEffect(
    () => {
      setKeyword(query);
      if (query) setTags([query]);
    },
    [query],
    {
      wait: 1000,
    }
  );

  const insertTag = useCallback(
    (tag: string) => {
      setQuery("");
      console.log(tag);
      if (tag === "" || tags.includes(tag)) return;
      let processed = tag;
      processed = tag.trim();
      if (processed.indexOf(" #") > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }
        setTags([...tags, ...tempTags]);
        return;
      }
      if (processed.charAt(0) === "#") {
        processed = processed.slice(1, processed.length);
      }
      setTags([...tags, processed]);
    },
    [tags]
  );

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e.key);
      if (e.key === "Backspace" && query === "") {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }
      const keys = [",", "Enter"];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        insertTag(query);
      }
    },
    [insertTag, tags, query]
  );

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Select tags</h3>
      <div className="relative">
        <Combobox
          value={tags}
          onChange={(tags) => {
            console.log("tags", tags);
            setTags(tags);
          }}
          multiple
        >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                onKeyDown={onKeyDown}
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
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {list.length === 0 && keyword !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  list.map((tag) => (
                    <Combobox.Option
                      key={tag.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={tag.name}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {tag.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default TagCombobox;
