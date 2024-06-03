import { useEffect, useRef } from 'react';
import { useLoaderData } from '@remix-run/react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import type { RoutesLoaderData } from '~/.server/routes/feeds/feeds.loader';
import { PostCard } from '~/components/shared/future/PostCard';
import { getTargetElement } from '~/libs/browser-utils/dom';
import { usePostTrendingInfiniteQuery } from '~/services/react-query/queries/posts/usePostTrendingInfiniteQuery';

const DATA_OVERSCAN = 10;

export default function FeaturedList() {
  const initialData = useLoaderData<RoutesLoaderData>();

  const { data, isFetchingNextPage, fetchNextPage } =
    usePostTrendingInfiniteQuery({
      initialData: initialData as any,
    });

  const pages = data?.pages ?? [];

  const result = pages.at(0)?.result;

  const hasNextPage = result?.pageInfo.hasNextPage ?? false;

  const items = pages.map((page) => page?.result?.list ?? []).flat() ?? [];

  const $container = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    estimateSize: () => 258,
    overscan: DATA_OVERSCAN,
    scrollMargin: getTargetElement($container)?.offsetTop ?? 0,
    initialRect: {
      width: 0,
      height: 258 * pages.length,
    },
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    items.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div ref={$container} className="max-w-full">
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > items.length - 1;
          const item = items.at(virtualRow.index);
          // const isEnd = totalCount === virtualRow.index + 1;

          if (isLoaderRow) {
            return null;
          }

          if (!item) {
            return null;
          }

          return (
            <div
              key={`items:${item.id}`}
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - rowVirtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <PostCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
