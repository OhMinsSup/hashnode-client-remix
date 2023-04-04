import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";

// api
import { getDraftsListApi } from "~/api/drafts/drafts";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// utils

import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

// hooks
import { useEventListener } from "~/libs/hooks/useEventListener";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDraftContext } from "~/context/useDraftContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// components
import MyDraftItem from "~/components/draft/MyDraftItem.backup";
import { Icons } from "~/components/shared/Icons";

const MyDraftSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const $input = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState("");

  const [isPending, startTransition] = useTransition();
  const { changeDraftId } = useDraftContext();

  const debounced = useDebounceFn(
    (str: string) => {
      setSearchValue(str);
    },
    {
      wait: 200,
      trailing: true,
    }
  );

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    QUERIES_KEY.DRAFTS.ROOT(searchValue),
    async ({ pageParam = 0, queryKey }, ...t) => {
      const [, keyword] = queryKey;
      const { result } = await getDraftsListApi({
        cursor: pageParam,
        limit: 100,
        keyword,
      });
      return result.result;
    },
    {
      staleTime: Infinity,
      enabled: !isPending,
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );

  const totalCount = useMemo(() => {
    return data?.pages?.[data.pages.length - 1]?.totalCount ?? 0;
  }, [data]);

  const list = useMemo(() => {
    return data?.pages?.flatMap?.((page) => page.list) ?? [];
  }, [data]);

  const onCollapsibleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeDraftId(undefined);
      startTransition(() => {
        debounced.run(e.target.value);
      });
    },
    [debounced, changeDraftId]
  );

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 100 && hasNextPage) {
      fetchNextPage();
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  return (
    <>
      <div className="draft-sidebar-search">
        <input
          type="search"
          ref={$input}
          className="input-seach"
          aria-label="Search drafts"
          placeholder="Search drafts…"
          onChange={onChange}
        />
        <span className="input-search--icon">
          <Icons.Search className="icon__sm" />
        </span>
      </div>
      <ScrollArea.Root className="draft-sidebar-content">
        <Collapsible.Root
          className="draft-sidebar-content__label"
          open={open}
          onOpenChange={onCollapsibleOpenChange}
        >
          <Collapsible.Trigger asChild>
            <button
              className="btn-trigger"
              aria-label="trigger collapsible button"
              aria-expanded={open}
            >
              <span>
                {searchValue
                  ? `Showing results for: ${totalCount}`
                  : `My Drafts (${totalCount})`}
              </span>
              <div className=" rounded-lg p-1">
                {open ? (
                  <Icons.Arrowup className="icon__sm stroke-current" />
                ) : (
                  <Icons.ArrowDown className="icon__sm stroke-current" />
                )}
              </div>
            </button>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <ScrollArea.Viewport className="ScrollAreaViewport" ref={ref}>
              {isFetching && <div>Loading...</div>}
              {list.map((draft, i) => (
                <MyDraftItem key={`my-draft-${draft.id}-${i}`} item={draft} />
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="ScrollAreaCorner" />
          </Collapsible.Content>
        </Collapsible.Root>
      </ScrollArea.Root>
    </>
  );
};

export default MyDraftSidebar;
