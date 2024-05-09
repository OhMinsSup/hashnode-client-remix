import React, { useCallback, useMemo, useState, useTransition } from "react";
import { Icons } from "~/components/icons";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useUserWidgetQuery, type Data } from "~/routes/api.v1.users.widget";
import { useWriteFormContext } from "~/components/write/context/useWriteFormContext";
import { cn } from "~/services/libs";

export default function InputAuthors() {
  const [input, setInput] = useState("");
  const [deferredInput, setDeferredInput] = useState("");
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { run } = useDebounceFn(
    () => {
      setDeferredInput(input);
      if (input.length > 0) setOpen(true);
      else setOpen(false);
    },
    {
      wait: 300,
    }
  );

  const onClose = useCallback(() => {
    setInput("");
    setDeferredInput("");
    setOpen(false);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);

      startTransition(() => {
        run();
      });
    },
    [run]
  );

  return (
    <>
      <div className="relative mb-2">
        <Input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="Start typing to search…"
          autoComplete="off"
        />
        <div
          className="absolute right-0 top-full z-10 h-auto w-full overflow-hidden rounded-md border bg-white shadow-lg dark:bg-slate-900 dark:border-slate-800"
          style={{
            display: open ? "block" : "none",
          }}
        >
          {open ? (
            <React.Suspense fallback={<>Loading....</>}>
              <Popover input={deferredInput} onClose={onClose} />
            </React.Suspense>
          ) : null}
        </div>
      </div>
      <SelectedAuthors />
    </>
  );
}

function SelectedAuthors() {
  const { watch, setValue, getValues } = useWriteFormContext();

  const authors = watch("authors") ?? [];

  const onRemove = useCallback(
    (author: string) => {
      const oldAuthors = getValues("authors") ?? [];

      const nextAuthors = oldAuthors.filter((t) => t !== author);

      setValue("authors", nextAuthors, {
        shouldDirty: true,
      });
    },
    [getValues, setValue]
  );

  return (
    <div className="flex flex-wrap gap-1">
      {authors.map((author) => (
        <Badge className="space-x-2" key={`selected-tag-${author}`}>
          <span>{author}</span>
          <Icons.close
            className="w-4 h-4 hover:text-red-600 focus:text-red-600 cursor-pointer"
            onClick={() => onRemove(author)}
          />
        </Badge>
      ))}
    </div>
  );
}

interface PopoverProps {
  input: string;
  onClose: () => void;
}

function Popover({ input, onClose }: PopoverProps) {
  const { data } = useUserWidgetQuery({
    searchParams: {
      keyword: input,
      limit: "5",
    },
  });

  const authors = data?.result ?? [];

  return (
    <>
      {authors.map((author) => (
        <PopoverAuthor
          key={`popover-author-${author.id}`}
          author={author}
          onClose={onClose}
        />
      ))}
    </>
  );
}

interface PopoverAuthorProps {
  author: Data;
  onClose: () => void;
}

function PopoverAuthor({ author, onClose }: PopoverAuthorProps) {
  const { setValue, getValues } = useWriteFormContext();

  const isSelected = useMemo(() => {
    const authors = getValues("authors") ?? [];
    return authors.includes(author.UserProfile.username.toLowerCase());
  }, [getValues, author]);

  const onClick = useCallback(() => {
    const oldAuthors = getValues("authors") ?? [];

    const nextAuthors = oldAuthors.includes(
      author.UserProfile.username.toLowerCase()
    )
      ? oldAuthors.filter(
          (t) => t !== author.UserProfile.username.toLowerCase()
        )
      : [...oldAuthors, author.UserProfile.username.toLowerCase()];

    setValue("authors", nextAuthors, {
      shouldDirty: true,
    });

    onClose();
  }, [getValues, author, setValue, onClose]);

  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(
        "flex flex-row items-start w-full place-content-between justify-start h-auto"
      )}
      onClick={onClick}
      aria-selected={isSelected}
    >
      <div className="flex min-w-0 flex-col items-start space-y-2 text-start">
        <span className="font-semibold truncate block text-lg">
          {author.UserProfile.username.toLowerCase()}
        </span>
      </div>
    </Button>
  );
}
