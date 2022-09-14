import React, { useCallback } from "react";

// hooks
import { useSearchTextAtom } from "~/atoms/searchAtom";

// components
import { SearchIcon } from "~/components/ui/Icon";

const SearchForm = () => {
  const [text, setText] = useSearchTextAtom();

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <div className="xl:col-s hidden flex-1 items-center lg:col-span-6 lg:flex xl:col-span-7">
      <form className="relative flex flex-1 flex-row items-stretch lg:col-span-5">
        <span className="absolute z-30 flex h-full flex-row items-center p-4 text-gray-500">
          <SearchIcon className="h-4 w-4 fill-current" />
        </span>
        <input
          type="text"
          value={text}
          className="relative z-20 w-full rounded-full border bg-zinc-50 px-10 py-2 outline-none"
          onChange={onChangeText}
        />
        <span className="pointer-events-none absolute top-0 right-0 z-20 mr-4 flex h-full flex-row items-center text-sm text-gray-500">
          {text ? (
            <>
              <p className="hidden lg:block">Press</p>
              <span className=" mx-1 rounded border p-[0.375rem] text-sm text-gray-400">
                ↵
              </span>
              <p className="chidden lg:block">to see all results</p>
            </>
          ) : (
            <span className="rounded border bg-white p-[0.375rem]">/</span>
          )}
        </span>
      </form>
    </div>
  );
};

export default SearchForm;
