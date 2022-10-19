import React from "react";
import TrendingSimplePostItem from "./TrendingSimplePostItem";

import type { RootLoaderData } from "~/api/schema/loader";

interface TrendingSimplePostItemProps {
  type: "1W" | "1M" | "3M" | "6M";
  simpleTrending?: RootLoaderData["simpleTrending"];
}

const TrendingSimplePost: React.FC<TrendingSimplePostItemProps> = ({
  type,
  simpleTrending,
}) => {
  return (
    <>
      {simpleTrending?.result?.list?.map((item) => (
        <TrendingSimplePostItem
          key={`trending-simple-post-item-${item.id}`}
          {...item}
        />
      ))}
    </>
  );
};

export default TrendingSimplePost;
