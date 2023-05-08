import React, { useMemo } from "react";
import classNames from "classnames";
import { isNull, isUndefined } from "~/utils/assertion";
import { useGetTopPostsQuery } from "~/api/posts/hooks/useGetTopPostsQuery";
import AppRightTabTrendingPost from "./AppRightTabTrendingPost";

interface AppRightTabTrendingPostListProps {
  duration: number;
  enabled?: boolean;
  initialData?: any;
}

export default function AppRightTabTrendingPostList({
  duration,
  initialData,
  enabled,
}: AppRightTabTrendingPostListProps) {
  const { data } = useGetTopPostsQuery(
    {
      duration: duration,
    },
    {
      enabled,
      initialData,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const posts = useMemo(() => {
    return data?.json?.result?.posts ?? [];
  }, [data]);

  if (isNull(posts) || isUndefined(posts)) return null;

  return (
    <div
      className={classNames({
        hidden: !enabled,
      })}
    >
      {posts?.map((item, index) => (
        <React.Fragment key={`tab-trending-post-${duration}-item-${item.id}`}>
          <AppRightTabTrendingPost {...item} />
          {index !== posts.length - 1 && (
            <hr className="custom-divide__tab-treding" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
