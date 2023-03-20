import React, { useEffect, useRef, useState } from "react";

// hooks
import { useSearchFieldState } from "react-stately";
import { useSearchField } from "react-aria";

// components
import { SearchIcon } from "~/components/__ui/Icon";
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useDraftContext } from "~/context/useDraftContext";

interface MyDraftSearchProps {}

const MyDraftSearch: React.FC<MyDraftSearchProps> = () => {
  const ref = useRef<HTMLInputElement>(null);

  const { keyword, changeKeyword } = useDraftSidebarContext();
  const { changeDraftId } = useDraftContext();

  const debounced = useDebounceFn(
    (str: string) => {
      changeDraftId(undefined);
      changeKeyword(str);
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  const [value, setValue] = useState(keyword);

  const state = useSearchFieldState({
    value,
    onChange: setValue,
  });

  const { labelProps, inputProps } = useSearchField(
    {
      label: "Search",
      placeholder: "Search drafts…",
      "aria-label": "Search",
      "aria-autocomplete": "list",
      "aria-labelledby": "search-info",
      onSubmit: setValue,
    },
    state,
    ref
  );

  useEffect(() => {
    debounced.run(value);
  }, [value]);

  return (
    <div className="draft-sidebar-search">
      <input {...inputProps} className="input-seach" />
      <span className="input-search--icon" {...labelProps}>
        <SearchIcon className="icon-sm" />
      </span>
    </div>
  );
};

export default MyDraftSearch;
