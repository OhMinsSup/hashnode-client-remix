import React, { useEffect, useMemo } from "react";
import classNames from "classnames";
import { isNull, isUndefined } from "~/utils/assertion";

// hooks
import { useFetcher } from "@remix-run/react";

// components
import AppRightSidebarTabTrendingPost from "./AppRightSidebarTabTrendingPost";

// types
import type { Loader } from "~/routes/_loader._public.loader.get-top-posts[.]json";

interface AppRightSidebarTabTrendingPostListProps {
  duration: number;
  enabled?: boolean;
  initialData?: any;
}

export default function AppRightSidebarTabTrendingPostList({
  duration,
  initialData,
  enabled,
}: AppRightSidebarTabTrendingPostListProps) {
  const fetcher = useFetcher<Loader>();

  useEffect(() => {
    if (enabled === false) return;
    fetcher.load(`/loader/get-top-posts.json?duration=${duration}`);
  }, [enabled]);

  const posts = useMemo(() => {
    return fetcher.data?.posts ?? [];
  }, [fetcher.data?.posts]);

  if (isNull(posts) || isUndefined(posts)) return null;

  return (
    <div
      className={classNames({
        hidden: !enabled,
      })}
    >
      {posts?.map((item, index) => (
        <React.Fragment key={`tab-trending-post-${duration}-item-${item.id}`}>
          <AppRightSidebarTabTrendingPost {...item} />
          {index !== posts.length - 1 && (
            <hr className="custom-divide__tab-treding" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
