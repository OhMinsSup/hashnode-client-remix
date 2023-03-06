import React, { useEffect, useMemo, useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";
import { getDraftsListApi } from "~/api/drafts/drafts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERIES_KEY } from "~/constants/constant";
import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { EmptyFileIcon } from "../ui/Icon";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const MyDraftSidebar = () => {
  useEffect(() => {
    getDraftsListApi();
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QUERIES_KEY.DRAFTS.ROOT,
    async ({ pageParam = 0 }) => {
      const { result } = await getDraftsListApi({
        cursor: pageParam,
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );

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

  return (
    <ScrollArea.Root className="draft-sidebar-content">
      {/* <div className="draft-sidebar-content__label" data-state="closed"></div>
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Tags</div>
          {TAGS.map((tag) => (
            <div className="Tag" key={tag}>
              {tag}
            </div>
          ))}
        </div> */}
      <Collapsible.Root
        className="draft-sidebar-content__label"
        open={true}
        onOpenChange={() => {}}
      >
        <Collapsible.Trigger asChild>
          <button className="btn-trigger">
            <span>My Drafts (23)</span>
            <div className=" rounded-lg p-1">
              <ArrowUpIcon className="icon-xs" />
            </div>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <ScrollArea.Viewport className="ScrollAreaViewport" ref={ref}>
            {TAGS.map((tag, i) => (
              <div className="my-draft-item" key={`${i}-${tag}`}>
                <button className="my-draft-content">
                  <div className="icon-wrapper">
                    <EmptyFileIcon className="icon mr-2s flex-shrink-0 !fill-none stroke-current" />
                  </div>
                  <div className="text">@radix-ui/colors</div>
                </button>
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
