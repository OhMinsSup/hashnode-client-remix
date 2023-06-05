import React, { useCallback, useEffect, useState } from "react";
import { useDraftContext } from "~/context/useDraftContext";
import { Icons } from "../shared/Icons";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";
import { isUndefined } from "~/utils/assertion";

export default function SearchDraftSidebarInput() {
  const { changeKeyword } = useDraftContext();
  const [input, setInput] = useState<string | undefined>("");

  const fn = useDebounceFn(
    () => {
      if (isUndefined(input)) return;
      changeKeyword(input);
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  useDeepCompareEffect(() => {
    fn.run();
  }, [input]);

  return (
    <div className="draft-sidebar-search">
      <input
        type="search"
        value={input}
        className="input-seach"
        aria-label="Search drafts"
        placeholder="Search drafts…"
        onChange={onChangeKeyword}
      />
      <span className="input-search--icon">
        <Icons.Search className="icon__sm" />
      </span>
    </div>
  );
}
