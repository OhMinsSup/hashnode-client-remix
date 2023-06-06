import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import uniqBy from "lodash-es/uniqBy";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useFetcher } from "@remix-run/react";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";

// utils
import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

// components
import MyDraftItem from "~/components/draft/MyDraftItem";
import { Icons } from "~/components/shared/Icons";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";
import type { DraftMyLoader } from "~/routes/draft.loader.my[.]json";

export default function MyDraftSidebar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const fetcher = useFetcher<DraftMyLoader>();
  const [open, setOpen] = useState(true);

  const { keyword } = useDraftContext();
  const [posts, setPosts] = useState<PostDetailRespSchema[]>([]);
  const cursor = useRef<number | null>(posts.at(-1)?.id ?? null);

  const totalCount = fetcher.data?.totalCount ?? 0;
  const canFetchMore = fetcher.data?.pageInfo?.hasNextPage ?? false;

  useDeepCompareEffect(() => {
    let loadUrl = "/draft/loader/my.json";
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
      let loadUrl = "/draft/loader/my.json";
      const searchParams = new URLSearchParams();
      if (cursor.current) {
        searchParams.append("cursor", cursor.current.toString());
      }
      if (keyword) {
        searchParams.append("keyword", keyword);
      }
      loadUrl += searchParams.toString() ? `?${searchParams.toString()}` : "";
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
        <Collapsible.Content className="h-80 overflow-y-scroll" ref={ref}>
          {posts.map((item, i) => (
            <MyDraftItem key={`my-draft-${item.id}-${i}`} item={item} />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
