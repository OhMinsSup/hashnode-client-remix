import React, { useCallback, useMemo, useRef, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";
import classNames from "classnames";

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
import { useDraftContext } from "~/context/useDraftContext";

// components
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { EmptyFileIcon } from "~/components/ui/Icon";
import Button from "~/components/ui/shared/Button";

const MyDraftSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const { keyword } = useDraftSidebarContext();

  const { changeDraftId, draftId } = useDraftContext();

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

  const onDraftClick = useCallback(
    (id: number) => {
      changeDraftId(id);
    },
    [changeDraftId]
  );

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
              <div
                aria-selected={
                  draftId ? (draftId === draft.id ? "true" : "false") : "false"
                }
                aria-label="my draft item"
                className="my-draft-item"
                key={`draft-${draft.id}-${i}`}
              >
                <Button
                  className={classNames("my-draft-content", {
                    active: draftId ? draftId === draft.id : false,
                  })}
                  aria-label="my draft item"
                  onPress={() => onDraftClick(draft.id)}
                >
                  <div className="icon-wrapper">
                    <EmptyFileIcon className="icon mr-2 flex-shrink-0 !fill-none stroke-current" />
                  </div>
                  <div className="text">{draft.title || "Untitled"}</div>
                </Button>
              </div>
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
