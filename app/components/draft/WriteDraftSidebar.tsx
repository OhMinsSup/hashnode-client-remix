import React, { useCallback, useMemo, useState, useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";

// hooks
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";
import { useGetMyPostsQuery } from "~/api/posts/hooks/useGetMyPostsQuery";

// components
import WriteDraftItem from "~/components/draft/WriteDraftItem";
import { Icons } from "~/components/shared/Icons";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

export default function WriteDraftSidebar() {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const { keyword } = useDraftSidebarContext();

  const { data, fetchNextPage, hasNextPage } = useGetMyPostsQuery({
    limit: 5,
    keyword,
  });

  const list = useMemo(() => {
    return data?.pages?.flatMap?.((page) => page.list) ?? [];
  }, [data]);

  const totalCount = useMemo(() => {
    const fristPage = data?.pages?.at(-1) ?? null;
    return fristPage?.totalCount ?? 0;
  }, [data]);

  const onCollapsibleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const scrollMethod = optimizeAnimation(() => {
    console.log("scrollMethod");
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 10 && hasNextPage) {
      fetchNextPage();
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  return (
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
              {keyword
                ? `Showing results for: ${totalCount}`
                : `Write Drafts (${totalCount})`}
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
            {list.map((item, i) => (
              <WriteDraftItem key={`write-draft-${item.id}-${i}`} item={item} />
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
}
