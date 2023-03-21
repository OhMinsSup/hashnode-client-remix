import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { CommentIcon, LikeIcon } from "../__ui/Icon";

import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface TabTrendingPostsItemProps extends PostDetailRespSchema {}

const TabTrendingPostsItem: React.FC<TabTrendingPostsItemProps> = ({
  id,
  title,
  subTitle,
  user,
}) => {
  const avatarUrl = useMemo(() => {
    return user?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [user]);

  return (
    <div className="tab-trending-post-item">
      {/* Thubmnail */}
      <div className="mr-3">
        <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)} className="user-profile-image">
          <div className="h-full w-full">
            <div className="image-wrapper">
              <img src={avatarUrl} alt="thumbnail" />
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
            <LikeIcon className="icon mr-2" />
            <span>66</span>
          </Link>
          {/* Comment */}
          <Link to="/" className="action-btn">
            <CommentIcon className="icon mr-2" />
            <span>6</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TabTrendingPostsItem;
