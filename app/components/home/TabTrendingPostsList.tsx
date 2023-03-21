import React, { useMemo } from "react";
import TabTrendingPostsItem from "~/components/home/TabTrendingPostsItem";
import { isNull, isUndefined } from "~/utils/assertion";
import { useGetTopPostsQuery } from "~/api/posts/hooks/useGetTopPostsQuery";

interface TabTrendingPostsListProps {
  enabled: boolean;
  duration: string;
  initialData?: any;
}

const TabTrendingPostsList: React.FC<TabTrendingPostsListProps> = ({
  duration,
  initialData,
  enabled,
}) => {
  const { data } = useGetTopPostsQuery(
    {
      duration: Number(duration),
    },
    {
      suspense: true,
      enabled,
      initialData,
    }
  );

  const posts = useMemo(() => {
    return data?.result?.result?.posts ?? [];
  }, [data]);

  if (isNull(posts) || isUndefined(posts)) return null;

  return (
    <>
      {posts?.map((item) => (
        <React.Fragment
          key={`trending-simple-post-${duration}-item-${item.id}`}
        >
          <TabTrendingPostsItem {...item} />
          {posts.at(-1) !== item && <hr className="custom-divide-my" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TabTrendingPostsList;
