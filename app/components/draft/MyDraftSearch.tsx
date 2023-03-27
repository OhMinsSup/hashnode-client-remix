import React, { useRef, useState } from "react";

// components
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useDraftContext } from "~/context/useDraftContext";
import { Icons } from "../shared/Icons";

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

  return (
    <div className="draft-sidebar-search">
      <input className="input-seach" />
      <span className="input-search--icon">
        <Icons.Search className="icon__sm" />
      </span>
    </div>
  );
};

export default MyDraftSearch;
