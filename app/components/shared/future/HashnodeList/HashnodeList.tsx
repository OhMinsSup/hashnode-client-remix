import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
import { isBrowser } from "~/libs/browser-utils";
import {
  type ItemContent,
  type VirtuosoHandle,
  type ComputeItemKey,
  Virtuoso,
} from "react-virtuoso";
import { useIsHydrating } from "~/libs/hooks/useIsHydrating";
import { isEmpty } from "~/utils/assertion";
import { useLoaderData } from "@remix-run/react";
import type { RoutesLoader } from "~/routes/_main._feeds._index";
import { cn } from "~/utils/util";
import type { SerializeFrom } from "@remix-run/cloudflare";

interface HashnodeListProps {
  type?: "feed.index" | "feed.following" | "feed.featured";
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
}

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

interface Restoration {
  top: number;
  pages: string[];
}

export default function HashnodeList({
  type = "feed.index",
  trendingTags,
  recommendedUsers,
}: HashnodeListProps) {
  const $virtuoso = useRef<VirtuosoHandle>(null);
  const $restoration = useRef<Restoration | null>(null);
  const $observer = useRef<MutationObserver | null>(null);
  const $isLockFetching = useRef(false);

  const key = useMemo(() => {
    return `@items::scroll::${type}`;
  }, [type]);

  const getRestoration = useCallback(() => {
    return $restoration.current;
  }, []);

  const setRestoration = useCallback((data: Restoration | null) => {
    $restoration.current = data;
  }, []);

  const hydrating = useIsHydrating("[data-hydrating-signal]");

  const data = useLoaderData<RoutesLoader>();

  const initialItemCount = useMemo(() => {
    const _list = data?.list ?? [];
    return _list.length;
  }, [data]);

  // console.log("hash", data);

  const closeMutationObserver = () => {
    if ($observer.current) {
      $observer.current.disconnect();
      $observer.current = null;
    }
  };

  // const getRestorationCursorIndex = () => {
  //   try {
  //     const _data = getRestoration();
  //     if (!_data || isEmpty(_data)) {
  //       return null;
  //     }
  //     if (isEmpty(_data.pages)) {
  //       return null;
  //     }
  //     const _pages = [];
  //     if (isEmpty(_pages)) {
  //       return null;
  //     }
  //     return {
  //       cusors: _data.pages,
  //       top: _data.top,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  return (
    <div className={styles.root}>
      {data?.list?.map((item, index) => {
        return (
          <div className="w-full" key={`${type}-hashnode-${item.id}`}>
            {index === 3 && recommendedUsers}
            {index === 7 && trendingTags}
            <HashnodeCard.V2 data={item} />
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <Virtuoso
  //     components={{
  //       List: React.forwardRef((props, ref) => {
  //         return <div className={styles.root} {...props} ref={ref} />;
  //       }),
  //       Item: ({ item, ...otherProps }) => {
  //         return <div className="w-full" {...otherProps} />;
  //       },
  //       Footer: () => <ReachedEnd />,
  //     }}
  //     computeItemKey={computeItemKey}
  //     data={data?.list ?? []}
  //     data-hydrating-signal
  //     endReached={() => {}}
  //     initialItemCount={initialItemCount}
  //     itemContent={itemContent}
  //     overscan={10}
  //     ref={$virtuoso}
  //     totalCount={data?.totalCount ?? 0}
  //     useWindowScroll
  //   />
  // );
}
