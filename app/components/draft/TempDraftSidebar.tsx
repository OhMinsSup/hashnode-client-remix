import React, { useCallback, useState, useRef, useEffect } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import uniqBy from "lodash-es/uniqBy";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useFetcher } from "@remix-run/react";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";

// components
import TempDraftItem from "~/components/draft/TempDraftItem";
import { Icons } from "~/components/shared/Icons";

// utils
import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

// types
import type { DraftTempLoader } from "~/routes/draft.temps[.]json";

export default function TempDraftSidebar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const fetcher = useFetcher<DraftTempLoader>();
  const [open, setOpen] = useState(true);

  const { keyword } = useDraftContext();
  const [posts, setPosts] = useState<any[]>([]);
  const cursor = useRef<number | null>(posts.at(-1)?.id ?? null);

  const totalCount = fetcher.data?.totalCount ?? 0;
  const canFetchMore = fetcher.data?.pageInfo?.hasNextPage ?? false;

  useDeepCompareEffect(() => {
    let loadUrl = "/draft/temps.json";
    if (keyword) {
      setPosts([]);
      loadUrl += `?keyword=${keyword}`;
    }
    fetcher.load(loadUrl);
  }, [keyword]);

  useEffect(() => {
    if (fetcher.data) {
      const { list } = fetcher.data;
      cursor.current = list.at(-1)?.id ?? null;
      setPosts((prevItems) => {
        // 이전 아이템의 값중에 cursor.current와 같은 id를 가진 아이템이 있으면
        // 이미 불러온 아이템이므로 무시하고, 없으면 추가한다.
        if (prevItems.find((item) => item.id === cursor.current)) {
          return prevItems;
        }

        return uniqBy([...prevItems, ...list], "id");
      });
    }
  }, [fetcher.data]);

  const onCollapsibleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 10 && canFetchMore) {
      const loadUrl =
        `/draft/temps.json?cursor=${cursor.current}` + keyword
          ? `&keyword=${keyword}`
          : "";
      fetcher.load(loadUrl);
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  return (
    <div className="draft-sidebar-content">
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
                : `Temp Drafts (${totalCount})`}
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

        <Collapsible.Content className="h-80 overflow-y-scroll" ref={ref}>
          {posts.map((item, i) => (
            <TempDraftItem key={`write-draft-${item.id}-${i}`} item={item} />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
