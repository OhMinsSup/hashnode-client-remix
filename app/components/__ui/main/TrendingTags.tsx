import React from "react";
import { Link } from "@remix-run/react";
import TagItem from "~/components/__ui/main/TagItem";

import { useLoaderData } from "@remix-run/react";
import { MoreArrowIcon } from "../Icon";

interface TrendingTagsProps {}

const TrendingTags: React.FC<TrendingTagsProps> = () => {
  const { trendingTag } = useLoaderData();

  return (
    <div className="tag-menu-container">
      {trendingTag?.list?.map((tag: any) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          count={tag.postsCount}
        />
      ))}
      <Link to="/tags" className="sell-all-tags">
        <span>See all</span>
        <MoreArrowIcon className="icon-xs ml-2" />
      </Link>
    </div>
  );
};

export default TrendingTags;
