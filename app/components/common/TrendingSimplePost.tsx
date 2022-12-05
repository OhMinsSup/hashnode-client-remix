import React, { useMemo } from "react";
import TrendingSimplePostItem from "./TrendingSimplePostItem";
import { isNull, isUndefined } from "~/utils/assertion";
import { useGetTopPostsQuery } from "~/api/posts/posts";

interface TrendingSimplePostItemProps {
  enabled: boolean;
  duration: string;
  initialData?: any;
}

const TrendingSimplePost: React.FC<TrendingSimplePostItemProps> = ({
  duration,
  initialData,
  enabled,
}) => {
  const { data } = useGetTopPostsQuery(
    {
      duration: Number(duration),
    },
    {
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
    <>
      {posts?.map((item) => (
        <TrendingSimplePostItem
          key={`trending-simple-post-${duration}-item-${item.id}`}
          {...item}
        />
      ))}
    </>
  );
};

export default TrendingSimplePost;
