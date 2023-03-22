import React, { useMemo } from "react";
import TabTrendingPostsItem from "~/components/home/TabTrendingPostsItem";
import { isNull, isUndefined } from "~/utils/assertion";
import { useGetTopPostsQuery } from "~/api/posts/hooks/useGetTopPostsQuery";
import classNames from "classnames";

interface TabTrendingPostsListProps {
  duration: number;
  enabled?: boolean;
  initialData?: any;
}

const TabTrendingPostsList: React.FC<TabTrendingPostsListProps> = ({
  duration,
  initialData,
  enabled,
}) => {
  const { data } = useGetTopPostsQuery(
    {
      duration: duration,
    },
    {
      suspense: true,
      enabled,
      initialData,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const posts = useMemo(() => {
    return data?.result?.result?.posts ?? [];
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
          <TabTrendingPostsItem {...item} />
          {index !== posts.length - 1 && (
            <hr className="custom-divide__tab-treding" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TabTrendingPostsList;
