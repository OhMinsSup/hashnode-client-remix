import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
import { useLoaderData } from "@remix-run/react";
import { getTargetElement } from "~/libs/browser-utils";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { RoutesLoaderData } from "~/server/routes/feeds/feeds-loader.server";
import {
  usePostListInfiniteQuery,
  type SearchParams,
} from "~/routes/api.v1.posts[.]json";

interface HashnodeListProps {
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
  searchParams?: SearchParams;
}

const CLIENT_DATA_OVERSCAN = 10;

export default function HashnodeList({
  trendingTags,
  recommendedUsers,
  searchParams,
}: HashnodeListProps) {
  const $list = useRef<HTMLDivElement>(null);

  const initialData = useLoaderData<RoutesLoaderData>();

  const total = initialData?.result?.totalCount ?? 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostListInfiniteQuery({
      initialData,
      searchParams,
    });

  const flatList = data?.pages?.map((page) => page?.result.list).flat() ?? [];

  const isEnd = flatList.length === total;

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? total + 1 : total,
    estimateSize: () => 512,
    overscan: CLIENT_DATA_OVERSCAN,
    scrollMargin: getTargetElement($list)?.offsetTop ?? 0,
    initialRect:
      total > 0
        ? {
            height: 1024,
            width: 0,
          }
        : undefined,
  });

  const virtualizerList = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualizerList].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= flatList.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    flatList.length,
    isFetchingNextPage,
    virtualizerList,
  ]);

  return (
    <div ref={$list}>
      <div className={styles.root}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > flatList.length - 1;
          const item = flatList.at(virtualRow.index);

          if (!item) {
            return null;
          }

          if (isLoaderRow) {
            if (hasNextPage) {
              return (
                <div
                  key={`hashnode:loading`}
                  style={{
                    height: virtualRow.size,
                    position: "absolute",
                    top: virtualRow.start,
                    left: 0,
                    right: 0,
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">Loading...</div>
                  </div>
                </div>
              );
            }

            return <ReachedEnd key={`hashnode:end`} />;
          }

          return (
            <React.Fragment key={`hashnode:${item.id}`}>
              {virtualRow.index === 3 && recommendedUsers}
              <HashnodeCard index={virtualRow.index} data={item} />
              {virtualRow.index === 7 && trendingTags}
            </React.Fragment>
          );
        })}
        {isEnd && <ReachedEnd />}
      </div>
    </div>
  );
}
