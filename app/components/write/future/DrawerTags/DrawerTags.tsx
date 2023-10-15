import React, { useCallback, useEffect, useState, useTransition } from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { useFetcher } from "@remix-run/react";

import { isEmpty } from "~/utils/assertion";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useWriteFormContext } from "../../context/form";

import {
  type Loader as TagsLoader,
  getPath as getTagsPath,
} from "~/routes/_loader._protected.loader.tags[.]json";

export default function DrawerTags() {
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [, startTransition] = useTransition();

  const fetcher = useFetcher<TagsLoader>();
  const { setValue } = useWriteFormContext();

  const debounce = useDebounceFn(
    (name: string) => {
      if (fetcher.state === "idle") {
        fetcher.load(
          getTagsPath({
            name,
          })
        );
        return;
      }
    },
    {
      wait: 500,
    }
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);

      startTransition(() => {
        debounce.run(e.target.value);
      });
    },
    [debounce, setValue]
  );

  const onCloseDropdown = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !isEmpty(fetcher.data)) {
      const _tags: any[] = [];
      const _list = fetcher.data.list ?? [];
      if (!isEmpty(_list)) {
        _tags.push(
          ..._list.map((item) => {
            return {
              id: item.id,
              name: item.name,
              postsCount: item.postsCount,
              selected: false,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            };
          })
        );
      }

      if (input) {
        const exstis = _list.find((item) => item.name.trim() === input.trim());
        if (!exstis) {
          _tags.push({
            id: _list.length + 1,
            name: input,
            postsCount: 0,
            selected: true,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          });
        }
        setValue("tags", _tags);
        setVisible(true);
      } else {
        setValue("tags", []);
        setVisible(false);
      }
    }
  }, [fetcher]);

  return (
    <div className="relative">
      <div className="relative mb-2">
        <input
          type="text"
          id="dropdown-input"
          value={input}
          autoComplete="off"
          data-toggle="dropdown"
          placeholder="Start typing to search…"
          className={styles.ipt_tag}
          onChange={onChange}
        />
        {visible && <DrawerTags.Dropdown onClose={onCloseDropdown} />}
      </div>
      <DrawerTags.Cateogries />
    </div>
  );
}

interface DropdownProps {
  onClose: () => void;
}

DrawerTags.Dropdown = function Item({ onClose }: DropdownProps) {
  const { watch } = useWriteFormContext();

  const tags = watch("tags") ?? [];

  return (
    <div className={cn(styles.tags_dropdown)}>
      {tags.map((item) => (
        <DrawerTags.DropdownItem
          key={`drawer-tags-dropdown-item-${item.id}`}
          item={item}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

interface DropdownItemProps extends DropdownProps {
  item: Partial<{
    id: number | null;
    postsCount: number | null;
    createdAt: number | null;
    updatedAt: number | null;
  }> & {
    name: string;
  };
}

DrawerTags.DropdownItem = function Item({ item, onClose }: DropdownItemProps) {
  const { getValues, setValue } = useWriteFormContext();
  const [, startTransition] = useTransition();

  const onSelectTag = useCallback(() => {
    const _currentTags = getValues("tags") ?? [];
    const _index = _currentTags.findIndex(
      (tag) => tag.name.trim() === item.name.trim()
    );
    if (_index !== -1) {
      _currentTags[_index].selected = true;
    }

    onClose();

    startTransition(() => {
      setValue("tags", _currentTags);
    });
  }, [item, onClose, getValues, setValue]);

  return (
    <button
      type="button"
      className={styles.tags_dropdown_item}
      data-index="0"
      onClick={onSelectTag}
    >
      <div className="flex min-w-0 flex-col items-start">
        <span className="mb-[1px] block w-full truncate font-semibold">
          {item.name}
        </span>
        <span className="w-full truncate text-sm text-slate-500">
          {item.postsCount ?? 0} posts
        </span>
      </div>
    </button>
  );
};

DrawerTags.Cateogries = function Item() {
  const { watch } = useWriteFormContext();

  const tags = (watch("tags") ?? []).filter((item) => item.selected);

  return (
    <div className={styles.tags_box}>
      {tags.map((tag) => (
        <DrawerTags.Category
          key={`drawer-tags-category-${tag}`}
          name={tag.name}
        />
      ))}
    </div>
  );
};

interface CategoryProps {
  name: string;
}

DrawerTags.Category = function Item({ name }: CategoryProps) {
  return (
    <div className={styles.tag}>
      <span title="JavaScript" className={styles.tag_text}>
        {name}
      </span>
      <button type="button">
        <svg viewBox="0 0 320 512">
          <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
        </svg>
      </button>
    </div>
  );
};
