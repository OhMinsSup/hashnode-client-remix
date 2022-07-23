import React from "react";
import { SearchIcon } from "~/components/ui/Icon";

const SearchForm = () => {
  return (
    <div className="hidden flex-1 items-center lg:col-span-4 lg:flex">
      <form className="relative flex flex-1 flex-row items-stretch lg:col-span-5">
        <span className="absolute z-30 flex h-full flex-row items-center p-4 text-gray-500">
          <SearchIcon className="h-4 w-4 fill-current" />
        </span>
        <input
          type="text"
          className="relative z-20 w-full rounded-full border bg-zinc-50 px-10 py-2 outline-none"
        />
        <span className=" pointer-events-none absolute top-0 right-0 z-20 mr-4 flex h-full flex-row items-center">
          <span className="rounded border bg-white p-[0.375rem] text-sm">
            /
          </span>
        </span>
      </form>
    </div>
  );
};

export default SearchForm;
