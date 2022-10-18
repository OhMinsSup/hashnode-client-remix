import React from "react";
import { useSimpleTrendingPostsQuery } from "~/api/posts/posts";
import TrendingSimplePostItem from "./TrendingSimplePostItem";

interface TrendingSimplePostItemProps {
  type: "1W" | "1M" | "3M" | "6M";
  simpleTrending?: any;
}

const TrendingSimplePost: React.FC<TrendingSimplePostItemProps> = ({
  type,
  simpleTrending,
}) => {
  const { result } = useSimpleTrendingPostsQuery(
    {
      type,
    },
    {
      initialData: simpleTrending,
    }
  );

  return (
    <>
      {result?.list?.map((item) => (
        <TrendingSimplePostItem
          key={`trending-simple-post-item-${item.id}`}
          {...item}
        />
      ))}
    </>
  );
};

export default TrendingSimplePost;
