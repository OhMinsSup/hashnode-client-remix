import React from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// components
import RightSidebarContentBox from "../home/RightSidebarContentBox";
import RightTagTrendingItem from "./RightTagTrendingItem";

// types
import type { TagWithPostCountSchema } from "~/api/schema/resp";

interface RightTagTrendingSidebarProps {
  title: string;
  toText: string;
  tags: TagWithPostCountSchema[];
}

function RightTagTrendingSidebar({
  title,
  tags,
  toText,
}: RightTagTrendingSidebarProps) {
  if (isEmpty(tags)) {
    return null;
  }

  return (
    <RightSidebarContentBox
      title={title}
      to={PAGE_ENDPOINTS.EXPLORE.TAGS}
      toText={toText}
    >
      <div>
        {tags.map((tag) => (
          <RightTagTrendingItem
            key={`${title.toLowerCase()}-n-tags-${tag.id}`}
            tag={tag}
          />
        ))}
      </div>
    </RightSidebarContentBox>
  );
}

export default RightTagTrendingSidebar;

RightTagTrendingSidebar.Skeleton = function RightTagTrendingSidebarSkeleton() {
  return (
    <RightSidebarContentBox.Skeleton toText="All tags">
      <div>
        <RightTagTrendingItem.Skeleton />
        <RightTagTrendingItem.Skeleton />
        <RightTagTrendingItem.Skeleton />
        <RightTagTrendingItem.Skeleton />
      </div>
    </RightSidebarContentBox.Skeleton>
  );
};
