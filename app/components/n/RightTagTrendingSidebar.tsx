import React from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// components
import AppRightSidebarContentBox from "~/components/shared/AppRightSidebarContentBox";
import RightTagTrendingItem from "./RightTagTrendingItem";

// types
import type { TagWithPostCountSchema } from "~/api/schema/resp";

interface RightTagTrendingSidebarProps {
  title: string;
  toText: string;
  tags: TagWithPostCountSchema[];
}

export default function RightTagTrendingSidebar({
  title,
  tags,
  toText,
}: RightTagTrendingSidebarProps) {
  if (isEmpty(tags)) {
    return null;
  }
  return (
    <AppRightSidebarContentBox
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
    </AppRightSidebarContentBox>
  );
}
