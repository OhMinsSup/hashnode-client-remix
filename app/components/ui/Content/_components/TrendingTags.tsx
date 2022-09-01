import React from "react";
import { TrendingIcon } from "../../Icon";
import TagItem from "./TagItem";

interface TagSchema {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface TrendingTagsProps {
  trendingTags: TagSchema[];
}

const TrendingTags: React.FC<TrendingTagsProps> = ({ trendingTags }) => {
  return (
    <div className="px-4">
      <hr className="my-5 border-gray-200"></hr>
      <h5 className="mb-5 flex flex-row items-center text-gray-700">
        <span>TrendingTags</span>
        <TrendingIcon className="ml-2 h-5 w-5 fill-current opacity-50" />
      </h5>
      <div className="flex flex-col items-start">
        {/* tag list */}
        {trendingTags.map((tag) => (
          <TagItem key={tag.id} {...tag} />
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;
