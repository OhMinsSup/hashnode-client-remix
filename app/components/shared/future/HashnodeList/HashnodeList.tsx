import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
import { type VirtuosoHandle, Virtuoso } from "react-virtuoso";
import {
  useLoaderData,
  useSearchParams,
  useBeforeUnload,
} from "@remix-run/react";
import type { RoutesLoader } from "~/routes/_main._feeds._index";
import { isBrowser, scheduleMicrotask } from "~/libs/browser-utils";
import { useIsHydrating } from "~/libs/hooks/useIsHydrating";

interface HashnodeListProps {
  type?: "feed.index" | "feed.following" | "feed.featured";
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
}

const LIMIT = 10;

const useSSRLayoutEffect = isBrowser ? useLayoutEffect : () => {};

const getCursorLimit = (searchParams: URLSearchParams) => ({
  cursor: Number(searchParams.get("cursor")) || undefined,
  limit: Number(searchParams.get("limit") || LIMIT.toString()),
});

type ScrollState = {
  hasNextPage: boolean;
  cursor: number | undefined;
  pages: SerializeSchema.SerializePost[][];
};

export default function HashnodeList({
  type = "feed.index",
  trendingTags,
  recommendedUsers,
}: HashnodeListProps) {
  const scrollKey = useRef(`infinite-scroll-${type}`);
  const $virtuoso = useRef<VirtuosoHandle>(null);
  const isMounted = useRef(false);
  const transition = useRef(false);
  const data = useLoaderData<RoutesLoader>();
  const hydrating = useIsHydrating("[data-hydrating-signal]");

  const [searchParams, setSearchParams] = useSearchParams();

  const { cursor } = getCursorLimit(searchParams);
  const [] = useState(() => cursor);

  const [scrollState, setScrollState] = useState<ScrollState>({
    hasNextPage: data?.pageInfo?.hasNextPage ?? false,
    cursor: data?.pageInfo?.endCursor ?? undefined,
    pages: [(data?.list ?? []) as unknown as SerializeSchema.SerializePost[]],
  });

  // console.log("scrollState", scrollState);

  const listToRender = useMemo(() => {
    const { pages } = scrollState;
    return pages.flatMap((page) => page);
  }, [scrollState]);

  useBeforeUnload(
    useCallback(() => {
      const $api = $virtuoso.current;
      if (!$api) return;
      $api.getState((state) => {
        const positions = JSON.stringify({
          top: state.scrollTop,
        });
        sessionStorage.setItem(scrollKey.current, positions);
      });
    }, [])
  );

  useSSRLayoutEffect(() => {
    if (!hydrating) return;
    if (!$virtuoso.current) return;

    const infiniteScrollTop = sessionStorage.getItem(scrollKey.current);
    if (!infiniteScrollTop) return;

    $virtuoso.current.scrollTo({
      top: Number(infiniteScrollTop),
    });

    return () => {
      sessionStorage.removeItem(scrollKey.current);
    };
  }, [hydrating]);

  const fetchMore = () => {
    const { hasNextPage, endCursor } = data.pageInfo;

    setScrollState((old) => {
      const pages = old.pages.filter((page) => {
        return !data.list.some((item) => {
          return page.some((pageItem) => pageItem.id === item.id);
        });
      });

      const newPages = [
        ...pages,
        data.list as unknown as SerializeSchema.SerializePost[],
      ];

      return {
        hasNextPage,
        cursor: endCursor ?? undefined,
        pages: newPages,
      };
    });
  };

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    transition.current = false;

    scheduleMicrotask(() => {
      if (transition.current) return;
      fetchMore();
    });

    return () => {
      transition.current = true;
    };
  }, [data]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const loadMore = (index: number) => {
    if (index <= 0) return;

    const { endCursor, hasNextPage } = data.pageInfo;

    if (endCursor && hasNextPage) {
      const nextSearchParams = new URLSearchParams();
      nextSearchParams.set("cursor", endCursor.toString());
      nextSearchParams.set("limit", LIMIT.toString());
      setSearchParams(nextSearchParams, {
        replace: true,
        preventScrollReset: true,
      });
    }
  };

  return (
    <Virtuoso
      components={{
        List: React.forwardRef((props, ref) => {
          return <div className={styles.root} {...props} ref={ref} />;
        }),
        Item: ({ item, ...otherProps }) => {
          return <div className="w-full" {...otherProps} />;
        },
        Footer: () => {
          if (scrollState.hasNextPage) {
            return null;
          }
          return <ReachedEnd />;
        },
      }}
      computeItemKey={(index, item) => {
        if (!item) {
          return `${type}-items-${index}`;
        }
        return `${type}-items-${item.id}-${index}`;
      }}
      data={listToRender}
      data-hydrating-signal
      endReached={loadMore}
      initialItemCount={data.list.length - 1}
      itemContent={(index, item) => {
        return <HashnodeCard.V2 index={index} data={item as any} />;
      }}
      overscan={900}
      ref={$virtuoso}
      style={{ height: "100%" }}
      totalCount={data.totalCount}
      useWindowScroll
    />
  );
}
