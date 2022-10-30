import React from "react";
import TrendingSimplePostItem from "./TrendingSimplePostItem";
import { isNull, isUndefined } from "~/utils/assertion";

import type { SimpleTrendingPostItemSchema } from "~/api/schema/resp";

interface TrendingSimplePostItemProps {
  type: "1W" | "1M" | "3M" | "6M";
  simpleTrending?: SimpleTrendingPostItemSchema[];
}

const TrendingSimplePost: React.FC<TrendingSimplePostItemProps> = ({
  type,
  simpleTrending,
}) => {
  if (isNull(simpleTrending) || isUndefined(simpleTrending)) return null;

  return (
    <>
      {simpleTrending?.map((item) => (
        <TrendingSimplePostItem
          key={`trending-simple-post-${type}-item-${item.id}`}
          {...item}
        />
      ))}
    </>
  );
};

export default TrendingSimplePost;
