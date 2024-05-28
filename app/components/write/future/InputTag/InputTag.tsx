import React, { useCallback, useMemo, useState, useTransition } from 'react';

import type { Data } from '~/services/react-query/queries/widget/useWidgetTagQuery';
import { Icons } from '~/components/icons';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { useDebounceFn } from '~/libs/hooks/useDebounceFn';
import { cn } from '~/services/libs';
import { useWidgetTagQuery } from '~/services/react-query/queries/widget/useWidgetTagQuery';

export default function InputTag() {
  const [input, setInput] = useState('');
  const [deferredInput, setDeferredInput] = useState('');
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
    },
  );

  const onClose = useCallback(() => {
    setInput('');
    setDeferredInput('');
    setOpen(false);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);

      startTransition(() => {
        run();
      });
    },
    [run],
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
          className="absolute right-0 top-full z-10 h-auto w-full overflow-hidden rounded-md border bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
          style={{
            display: open ? 'block' : 'none',
          }}
        >
          {open ? (
            <React.Suspense fallback={<>Loading....</>}>
              <Popover input={deferredInput} onClose={onClose} />
            </React.Suspense>
          ) : null}
        </div>
      </div>
      <SelectedTags />
    </>
  );
}

function SelectedTags() {
  const { watch, setValue, getValues } = useWriteFormContext();

  const tags = watch('tags') ?? [];

  const onRemove = useCallback(
    (tag: string) => {
      const oldTags = getValues('tags') ?? [];

      const nextTags = oldTags.filter((t) => t !== tag);

      setValue('tags', nextTags, {
        shouldDirty: true,
      });
    },
    [getValues, setValue],
  );

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge className="space-x-2" key={`selected-tag-${tag}`}>
          <span>{tag}</span>
          <Icons.close
            className="h-4 w-4 cursor-pointer hover:text-red-600 focus:text-red-600"
            onClick={() => onRemove(tag)}
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
  const { data } = useWidgetTagQuery({
    searchParams: {
      keyword: input,
      limit: '5',
    },
  });

  const tags = data?.result ?? [];

  return (
    <>
      <PopoverTag
        tag={{
          id: 'input',
          name: input,
          description: undefined,
          image: undefined,
          count: {
            PostTags: 0,
            UserTags: 0,
          },
          TagStats: undefined,
        }}
        onClose={onClose}
      />
      {tags.map((tag) => (
        <PopoverTag key={`popover-tag-${tag.id}`} tag={tag} onClose={onClose} />
      ))}
    </>
  );
}

interface PopoverTagProps {
  tag: Data;
  onClose: () => void;
}

function PopoverTag({ tag, onClose }: PopoverTagProps) {
  const { setValue, getValues } = useWriteFormContext();

  const isSelected = useMemo(() => {
    const tags = getValues('tags') ?? [];
    return tags.includes(tag.name.toLowerCase());
  }, [getValues, tag.name]);

  const onClick = useCallback(() => {
    const oldTags = getValues('tags') ?? [];

    const nextTags = oldTags.includes(tag.name.toLowerCase())
      ? oldTags.filter((t) => t !== tag.name.toLowerCase())
      : [...oldTags, tag.name.toLowerCase()];

    setValue('tags', nextTags, {
      shouldDirty: true,
    });

    onClose();
  }, [getValues, tag.name, setValue, onClose]);

  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      className={cn(
        'flex h-auto w-full flex-row place-content-between items-start justify-start',
      )}
      onClick={onClick}
      aria-selected={isSelected}
    >
      <div className="flex min-w-0 flex-col items-start space-y-2 text-start">
        <span className="block truncate text-lg font-semibold">
          {tag.name.toLowerCase()}
        </span>
        {tag.description && (
          <span className="w-full truncate text-sm text-muted-foreground">
            #{tag.description}
          </span>
        )}
        <span className="w-full truncate text-sm text-muted-foreground">
          {tag.count.PostTags} posts
        </span>
      </div>
    </Button>
  );
}
