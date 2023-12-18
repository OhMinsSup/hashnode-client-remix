import React, {
  useId,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./styles.module.css";
import { useFetcher } from "@remix-run/react";

import { isEmpty } from "~/utils/assertion";
import { useWriteFormContext } from "../../context/form";
import { useSettingTagsContext } from "~/components/setting/context/setting-tag";
import { getPath } from "~/routes/_loader._protected.loader.tags[.]json";

import type { RoutesLoader } from "~/routes/_loader._protected.loader.tags[.]json";
import { Icons } from "~/components/shared/Icons";

export default function DrawerTags() {
  // const navigation = useNavigation();

  // const {
  //   formState: { errors },
  // } = useWriteFormContext();

  // const isSubmitting = useMemo(
  //   () => navigation.state === "submitting",
  //   [navigation.state]
  // );

  return (
    <div className="relative">
      <div className="relative mb-2">
        <DrawerTags.Input popover={<DrawerTags.Popover />} />
      </div>
      <DrawerTags.Tags />
    </div>
  );
}

interface InputProps {
  popover?: React.ReactNode;
}

DrawerTags.Input = function Item({ popover }: InputProps) {
  const [input, setInput] = useState("");
  const [, startTransition] = useTransition();
  const { inputValue, changeInput, reset, taskQueue } = useSettingTagsContext();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);

      startTransition(() => {
        taskQueue.enqueue(value, (lastValue) => {
          changeInput(lastValue);
        });
      });
    },
    [changeInput]
  );

  useEffect(() => {
    setInput("");
  }, [reset]);

  return (
    <>
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
      {inputValue.length ? popover : null}
    </>
  );
};

DrawerTags.Popover = function Item() {
  const { inputValue, tags, upsertTags } = useSettingTagsContext();

  const fetcher = useFetcher<RoutesLoader>();

  const id = useId();

  const isDone = fetcher.state === "idle" && fetcher.data != null;

  const skills = useMemo(() => {
    const data = new Set<string>(tags);
    if (inputValue) data.add(inputValue);
    return [...data];
  }, [inputValue, tags]);

  useEffect(() => {
    if (inputValue) {
      fetcher.load(getPath({ name: inputValue, limit: 10 }));
    }
  }, [inputValue]);

  useEffect(() => {
    if (isDone && !isEmpty(fetcher.data?.list)) {
      const appendTags = fetcher.data?.list.map((tag) => tag.name);
      if (appendTags) upsertTags(appendTags);
    }
  }, [isDone]);

  return (
    <div className={styles.tags_dropdown}>
      {skills.map((tag, index) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <DrawerTags.PopoverTag
          key={`popover-tag-${tag}-${id}`}
          tag={tag}
          index={index}
        />
      ))}
    </div>
  );
};

interface PopoverTagProps {
  tag: string;
  index: number;
}

DrawerTags.PopoverTag = function Item({ tag, index }: PopoverTagProps) {
  const { upsertTag, changeInput } = useSettingTagsContext();
  const { getValues, setValue } = useWriteFormContext();
  const [isPending, startTransition] = useTransition();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      upsertTag(tag);
      startTransition(() => {
        const _skills = getValues("tags") ?? [];
        const index = _skills.indexOf(tag);
        if (index === -1) {
          _skills.push(tag);
          setValue("tags", _skills, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        changeInput("");
      });
    },
    [changeInput, getValues, setValue, tag, upsertTag]
  );

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={styles.tags_dropdown_item}
      href="#"
      data-index={index}
      data-value={tag}
      onClick={onClick}
      aria-disabled={isPending}
    >
      {tag}
    </a>
  );
};

DrawerTags.Tags = function Item() {
  const { tags } = useSettingTagsContext();
  const id = useId();

  const skills = useMemo(() => {
    return [...tags];
  }, [tags]);

  if (isEmpty(skills)) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap">
      {skills.map((tag, index) => (
        <DrawerTags.Tag key={`tag-${tag}-${id}`} tag={tag} index={index} />
      ))}
    </div>
  );
};

interface TagProps {
  tag: string;
  index: number;
}

DrawerTags.Tag = function Item({ tag, index }: TagProps) {
  const { removeTag, resetInput } = useSettingTagsContext();
  const { getValues, setValue } = useWriteFormContext();
  const [isPending, startTransition] = useTransition();

  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      removeTag(tag);
      resetInput();
      startTransition(() => {
        const _skills = getValues("tags") ?? [];
        const index = _skills.indexOf(tag);
        if (index !== -1) {
          _skills.splice(index, 1);
          setValue("tags", _skills, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      });
    },
    [getValues, removeTag, setValue, tag, resetInput]
  );

  return (
    <div className="button-primary small mr-2 mb-2 flex flex-row items-center">
      {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className="mr-2">
        <span>{tag}</span>
      </a>
      <button
        data-index={index}
        data-value={tag}
        type="button"
        disabled={isPending}
        onClick={onRemove}
      >
        <Icons.V2.SettingTagX className="h-4 w-4 fill-current" />
      </button>
    </div>
  );
};
