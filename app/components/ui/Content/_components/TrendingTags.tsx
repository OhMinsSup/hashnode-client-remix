import React from "react";
import TagItem from "./TagItem";

import { useLoaderData } from "@remix-run/react";

// types
import type { RootLoaderData } from "~/api/schema/loader";

interface TrendingTagsProps {}

const TrendingTags: React.FC<TrendingTagsProps> = () => {
  const { trendingTag } = useLoaderData<RootLoaderData>();

  return (
    <div className="flex flex-col items-start">
      {/* tag list */}
      {trendingTag?.result?.list.map((tag) => (
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
