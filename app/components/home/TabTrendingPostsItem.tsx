import React from "react";

// remix
import { Link } from "@remix-run/react";

// components
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface TabTrendingPostsItemProps extends PostDetailRespSchema {}

const TabTrendingPostsItem: React.FC<TabTrendingPostsItemProps> = ({
  id,
  title,
  subTitle,
  user,
}) => {
  return (
    <div className="tab-trending-post-item">
      {/* Thubmnail */}
      <div className="mr-3">
        <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)} className="user-profile-image">
          <div className="h-full w-full">
            <div className="image-wrapper">
              <img src="/images/default_profile.png" alt="thumbnail" />
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="title">
          <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)}>{title}</Link>
        </h3>
        <p className="description">
          <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)}>{subTitle}</Link>
        </p>
        <div className="footer">
          {/* Like */}
          <Link to="/" className="action-btn">
            <Icons.LinkHandler className="icon__base mr-2 fill-current" />
            <span>66</span>
          </Link>
          {/* Comment */}
          <Link to="/" className="action-btn">
            <Icons.Comment className="icon__base mr-2 fill-current" />
            <span>6</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabTrendingPostsItem;
