import React from "react";
import TagItem from "~/components/ui/main/TagItem";

import { useLoaderData } from "@remix-run/react";

interface TrendingTagsProps {}

const TrendingTags: React.FC<TrendingTagsProps> = () => {
  const { trendingTag } = useLoaderData();

  return (
    <div className="flex flex-col items-start">
      {/* tag list */}
      {trendingTag?.list?.map((tag: any) => (
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
