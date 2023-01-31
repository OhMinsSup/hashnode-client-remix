import React, { useMemo } from "react";
import TrendingSimplePostItem from "./TrendingSimplePostItem";
import { isNull, isUndefined } from "~/utils/assertion";
import { useGetTopPostsQuery } from "~/api/posts/hooks/useGetTopPostsQuery";

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
  const { data, isLoading } = useGetTopPostsQuery(
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

  if (isLoading) return <>Loading...</>;

  if (isNull(posts) || isUndefined(posts)) return null;

  return (
    <>
      {posts?.map((item) => (
        <React.Fragment
          key={`trending-simple-post-${duration}-item-${item.id}`}
        >
          <TrendingSimplePostItem {...item} />
          {posts.at(-1) !== item && <hr className="custom-divide-my" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TrendingSimplePost;
