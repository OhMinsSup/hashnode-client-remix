import React, { useCallback } from 'react';
import { useLoaderData } from '@remix-run/react';
import { Virtuoso } from 'react-virtuoso';

import type { RoutesLoaderData } from '~/.server/routes/feeds/feeds.loader';
import { PostCard } from '~/components/shared/future/PostCard';
import { usePostInfiniteQuery } from '~/services/react-query/queries/posts/usePostInfiniteQuery';

const List = React.forwardRef<any, any>((props, ref) => {
  return (
    <div
      className="flex flex-col items-center gap-6 sm:gap-4 md:gap-5 lg:gap-6"
      {...props}
      ref={ref}
    />
  );
});

export default function PersonalizedList() {
  const initialData = useLoaderData<RoutesLoaderData>();

  const { data, isFetchingNextPage, fetchNextPage } = usePostInfiniteQuery({
    initialData: initialData as any,
  });

  const pages = data?.pages ?? [];

  const result = pages.at(0)?.result;

  const hasNextPage = result?.pageInfo.hasNextPage ?? false;

  const totalCount = initialData?.result?.totalCount ?? 0;

  const items = pages.map((page) => page?.result?.list ?? []).flat() ?? [];

  const endReached = useCallback(
    (index: number) => {
      if (index >= items.length - 1 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, items.length],
  );

  return (
    <Virtuoso
      useWindowScroll
      data={items}
      components={{ List }}
      endReached={endReached}
      totalCount={totalCount}
      itemContent={(index) => {
        return <PostCard key={`personailized-item-${index}`} />;
      }}
    />
  );
}
