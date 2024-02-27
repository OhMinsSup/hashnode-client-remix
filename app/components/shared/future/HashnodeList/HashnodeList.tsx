import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
// import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
import { useLoaderData } from "@remix-run/react";
import { getTargetElement } from "~/libs/browser-utils";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { RoutesLoaderData } from "~/server/routes/feeds/feeds-loader.server";

interface HashnodeListProps {
  type?: "feed.index" | "feed.following" | "feed.featured";
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
}

const LIMIT = 10;

const CLIENT_LIMIT_SIZE = 30;
const CLIENT_DATA_OVERSCAN = 10;

export default function HashnodeList({
  type = "feed.index",
  trendingTags,
  recommendedUsers,
}: HashnodeListProps) {
  const $list = useRef<HTMLDivElement>(null);

  const data = useLoaderData<RoutesLoaderData>();

  const total = data?.result?.totalCount ?? 0;

  const rowVirtualizer = useWindowVirtualizer({
    count: total,
    estimateSize: () => 512,
    overscan: CLIENT_DATA_OVERSCAN,
    scrollMargin: getTargetElement($list)?.offsetTop ?? 0,
  });

  const flatList = data?.result?.list ?? [];

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >=
      flatList.length - 1
      // lastItem.index >= flatList.length - 1 &&
      // hasNextPage &&
      // !isFetchingNextPage
    ) {
      console.log("fetchNextPage");
      // fetchNextPage();
    }
  }, [
    // hasNextPage,
    // fetchNextPage,
    flatList.length,
    // isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
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
            return (
              <div
                key={`hashnode:${item.id}:loading`}
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

          return (
            <React.Fragment key={`hashnode:${item.id}`}>
              {virtualRow.index === 3 && recommendedUsers}
              <HashnodeCard index={virtualRow.index} data={item} />
              {virtualRow.index === 7 && trendingTags}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
