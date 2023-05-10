import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// hooks
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useFetcher, useLoaderData } from "@remix-run/react";

// utils
import { isBrowser } from "~/libs/browser-utils";
import uniqBy from "lodash-es/uniqBy";

// components
import PostsCard from "~/components/home/PostsCard.unstable";
import ReachedEnd from "~/components/shared/ReachedEnd";

import type { MainFeedsIndexLoader } from "~/routes/_main._feeds._index";
import type { MainFeedsFeaturedLoader } from "~/routes/_main._feeds.featured";
import type { nTagIndexLoader } from "~/routes/_n.n.$tag._index";
import type { nTagHotLoader } from "~/routes/_n.n.$tag.hot";
import type { MainUserPostsIndexLoader } from "~/routes/_main._users.$username._index";

const LIMIT = 15;

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

type Loader =
  | MainFeedsIndexLoader
  | MainFeedsFeaturedLoader
  | nTagIndexLoader
  | nTagHotLoader
  | MainUserPostsIndexLoader;

const PostsList = () => {
  const data = useLoaderData<Loader>();
  const fetcher = useFetcher<Loader>();

  const [list, setList] = useState(data.posts.list);

  const parentRef = useRef<HTMLDivElement>(null);
  const cursor = useRef<number | null>(list.at(-1)?.id ?? null);

  const parentOffsetRef = useRef(0);

  const totalCount = data.posts.totalCount ?? 0;
  const canFetchMore =
    data.posts?.pageInfo?.hasNextPage ||
    fetcher.data?.posts?.pageInfo?.hasNextPage;

  useSSRLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: totalCount,
    estimateSize: useCallback(() => 246, []),
    scrollMargin: parentOffsetRef.current,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    const startFetching = () => {
      if (!cursor.current) return;

      const [lastItem] = [...items].reverse();
      if (!lastItem) {
        return;
      }

      if (fetcher.data) {
        const { posts } = fetcher.data;
        const { hasNextPage } = posts.pageInfo ?? {};
        if (!hasNextPage) {
          return;
        }
        cursor.current = posts.list.at(-1)?.id ?? null;
      }

      if (
        lastItem.index > list.length - 1 &&
        canFetchMore &&
        fetcher.state === "idle"
      ) {
        fetcher.load(`/?index&cursor=${cursor.current}&limit=${LIMIT}`);
        return;
      }
    };

    startFetching();
  }, [fetcher, items, list, canFetchMore]);

  useEffect(() => {
    if (fetcher.data) {
      const { posts } = fetcher.data;
      cursor.current = posts.list.at(-1)?.id ?? null;
      setList((prevItems) => {
        // 이전 아이템의 값중에 cursor.current와 같은 id를 가진 아이템이 있으면
        // 이미 불러온 아이템이므로 무시하고, 없으면 추가한다.
        if (prevItems.find((item) => item.id === cursor.current)) {
          return prevItems;
        }

        return uniqBy([...prevItems, ...posts.list], "id");
      });
    }
  }, [fetcher.data]);

  return (
    <div ref={parentRef}>
      <div
        className="relative w-full"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className="absolute left-0 top-0 w-full"
          style={{
            ...(items[0]
              ? {
                  transform: `translateY(${
                    items[0].start - virtualizer.options.scrollMargin
                  }px)`,
                }
              : {}),
          }}
        >
          {items.map((virtualRow) => {
            const { index, key } = virtualRow;
            const item = list.at(index)!;
            return (
              <PostsCard
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                key={`post-card-${key}-${item?.id}`}
                post={item}
              />
            );
          })}
        </div>
      </div>
      {!canFetchMore ? <ReachedEnd className="pt-0" /> : null}
    </div>
  );
};

export default PostsList;
