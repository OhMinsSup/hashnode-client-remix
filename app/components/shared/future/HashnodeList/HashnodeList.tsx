import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
import { isBrowser } from "~/libs/browser-utils";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { useIsHydrating } from "~/libs/hooks/useIsHydrating";
import { isEmpty } from "~/utils/assertion";
import { useLoaderData } from "@remix-run/react";
import type { RoutesLoader } from "~/routes/_main._feeds._index";
import { cn } from "~/utils/util";

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

  console.log("hash", data);

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
    <Virtuoso
      components={{
        List: React.forwardRef((props, ref) => {
          return <div className={styles.root} {...props} ref={ref} />;
        }),
        Item: ({ item, ...otherProps }) => {
          return <div className="w-full" {...otherProps} />;
        },
        Footer: () => <ReachedEnd />,
      }}
      computeItemKey={(index, item) => {
        if (!item) {
          return `${type}-hashnode-${index}`;
        }
        return `${type}-hashnode-${item.id}-${index}`;
      }}
      data={data?.list ?? []}
      data-hydrating-signal
      endReached={() => {}}
      initialItemCount={(data?.list ?? []).length - 1}
      itemContent={(index, item) => {
        if (index === 3) {
          return (
            <>
              {recommendedUsers}
              <HashnodeCard.V2 data={item} />
            </>
          );
        }

        if (index === 7) {
          return (
            <>
              {trendingTags}
              <HashnodeCard.V2 data={item} />
            </>
          );
        }
        return <HashnodeCard.V2 data={item} />;
      }}
      overscan={10}
      ref={$virtuoso}
      totalCount={data?.totalCount ?? 0}
      useWindowScroll
    />
  );
}
