import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { ImageGalleryCard } from '~/components/write/future/ImageGalleryCard';
import { getTargetElement } from '~/libs/browser-utils/dom';
import { useAssetFileListInfiniteQuery } from '~/routes/api.v1.assets.files';

const MIN_ITEM_HEIGHT_SIZE = 154;

export default function ImageGalleryCardList() {
  const { data, isFetchingNextPage, fetchNextPage } =
    useAssetFileListInfiniteQuery({
      searchParams: {
        mediaType: 'IMAGE',
        uploadType: 'POST_THUMBNAIL',
      },
    });

  const pages = data?.pages ?? [];

  const result = pages.at(0)?.result;

  const hasNextPage = result?.pageInfo.hasNextPage ?? false;

  const items = pages.map((page) => page?.result?.list ?? []).flat() ?? [];

  const $container = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => getTargetElement($container) ?? null,
    estimateSize: () => MIN_ITEM_HEIGHT_SIZE,
    lanes: 3,
    overscan: 6,
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
    <div
      ref={$container}
      className="flex w-full max-w-full justify-center overflow-y-auto overflow-x-hidden"
      style={{
        height: '200px',
      }}
    >
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const index = virtualRow.index;
          const item = items[index];

          if (!item) {
            return null;
          }

          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 w-1/3 p-2"
              style={{
                left: `${virtualRow.lane * 33}%`,
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ImageGalleryCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
