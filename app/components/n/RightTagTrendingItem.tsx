import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { TagWithPostCountSchema } from "~/api/schema/resp";

interface RightTagTrendingItemProps {
  tag: TagWithPostCountSchema;
}

function RightTagTrendingItem({ tag }: RightTagTrendingItemProps) {
  const to = useMemo(() => {
    return PAGE_ENDPOINTS.N.TAG(tag.name);
  }, [tag.name]);

  return (
    <div>
      <div className="right-tag-trending__item">
        <div className="right-tag-trending__item-img">
          <Link to={to} className="right-tag-trending__item-img-container">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=100&h=100&fit=crop&crop=entropy&auto=compress,format&format=webp"
              alt=""
            />
          </Link>
        </div>
        <div className="right-tag-trending__item-content">
          <h3 className="right-tag-trending__item-title">
            <Link to={to} aria-label={tag.name}>
              #{tag.name}
            </Link>
          </h3>
          <Link
            to={to}
            aria-label="Total articles count"
            className="right-tag-trending__item-count"
          >
            + {tag.postsCount} articles this week
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RightTagTrendingItem;

RightTagTrendingItem.Skeleton = function RightTagTrendingItemSkeleton() {
  return (
    <div>
      <div className="right-tag-trending__item">
        <div className="right-tag-trending__item-img">
          <div className="right-tag-trending__item-img-container">
            <div className="right-tag-trending__item-img-container__img" />
          </div>
        </div>
        <div className="right-tag-trending__item-content">
          <div className="right-tag-trending__item-title">
            <div className="right-tag-trending__item-title__text" />
          </div>
          <div className="right-tag-trending__item-count">
            <div className="right-tag-trending__item-count__text" />
          </div>
        </div>
      </div>
    </div>
  );
};
