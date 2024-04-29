import React, { useCallback, useState, useTransition } from "react";

import { Icons } from "~/components/icons";
import { Input } from "~/components/ui/input";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useWriteContext } from "~/components/write/context/useWriteContext";

interface SearchInputProps {
  initialKeyword?: string;
  isSearch?: boolean;
}

export default function SearchInput({
  initialKeyword,
  isSearch,
}: SearchInputProps) {
  const { changeLeftSideKeyword } = useWriteContext();
  const [query, setQuery] = useState(initialKeyword ?? "");
  const [, startTransition] = useTransition();

  const { run } = useDebounceFn(
    () => {
      changeLeftSideKeyword(query);
    },
    {
      wait: 300,
    }
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);

      startTransition(() => {
        run();
      });
    },
    [run]
  );

  const onClear = useCallback(() => {
    setQuery("");
    changeLeftSideKeyword("");
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setQuery(query);

        startTransition(() => {
          run();
        });
      }
    },
    [query, run]
  );

  return (
    <div className="relative w-full">
      <Icons.search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="text"
        className="px-8"
        placeholder="Search drafts..."
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {isSearch ? (
        <Icons.close
          className="absolute right-2 top-2.5 size-4 text-muted-foreground"
          onClick={onClear}
        />
      ) : null}
    </div>
  );
}
