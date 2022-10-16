import React from "react";
import TagItem from "./TagItem";

import { useLoaderData } from "@remix-run/react";
import { useTagQuery } from "~/api/tags/tags";

interface TrendingTagsProps {}

const TrendingTags: React.FC<TrendingTagsProps> = () => {
  const { trendingTag } = useLoaderData<Record<string, any>>();

  const { list } = useTagQuery(
    {
      limit: 5,
      type: "popular",
    },
    {
      initialData: trendingTag,
    }
  );

  return (
    <div className="flex flex-col items-start">
      {/* tag list */}
      {list.map((tag) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          count={tag.postsCount}
        />
      ))}
    </div>
  );
};

export default TrendingTags;
