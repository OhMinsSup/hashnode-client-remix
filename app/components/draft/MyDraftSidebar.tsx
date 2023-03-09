import React, { useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";
import { useInfiniteQuery } from "@tanstack/react-query";

// components
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import Button from "~/components/ui/shared/Button";
import MyDraftItem from "~/components/draft/MyDraftItem";

const MyDraftSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const { keyword } = useDraftSidebarContext();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QUERIES_KEY.DRAFTS.ROOT(keyword),
    async ({ pageParam = 0, queryKey }, ...t) => {
      const [, keyword] = queryKey;
      const { result } = await getDraftsListApi({
        cursor: pageParam,
        limit: 1000,
        keyword,
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );

  const totalCount = useMemo(() => {
    return data?.pages?.[data.pages.length - 1]?.totalCount ?? 0;
  }, [data]);

  const list = useMemo(() => {
    return data?.pages?.flatMap?.((page) => page.list) ?? [];
  }, [data]);

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 200 && hasNextPage) {
      fetchNextPage();
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  const onCollapsibleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <ScrollArea.Root className="draft-sidebar-content">
      <Collapsible.Root
        className="draft-sidebar-content__label"
        open={open}
        onOpenChange={onCollapsibleOpenChange}
      >
        <Collapsible.Trigger asChild>
          <Button
            className="btn-trigger"
            aria-label="trigger collapsible button"
            aria-expanded={open}
          >
            <span>
              {keyword
                ? `Showing results for: ${totalCount}`
                : `My Drafts (${totalCount})`}
            </span>
            <div className=" rounded-lg p-1">
              {open ? (
                <ArrowUpIcon className="icon-xs" />
              ) : (
                <ArrowDownIcon className="icon-xs" />
              )}
            </div>
          </Button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <ScrollArea.Viewport className="ScrollAreaViewport" ref={ref}>
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
  );
};

export default MyDraftSidebar;
