import React, { useMemo } from "react";

// remix
import { Link } from "@remix-run/react";

// components
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface TabTrendingPostsItemProps extends PostDetailRespSchema {}

function TabTrendingPostsItem({
  id,
  title,
  subTitle,
  user,
  count,
}: TabTrendingPostsItemProps) {
  const to = useMemo(() => {
    return PAGE_ENDPOINTS.ITEMS.ID(id);
  }, [id]);

  return (
    <div className="tab-trending-post-item">
      {/* Thubmnail */}
      <div className="mr-3">
        <Link to={to} className="user-profile-image">
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
          <Link to={to}>{title}</Link>
        </h3>
        <p className="description">
          <Link to={to}>{subTitle}</Link>
        </p>
        <div className="footer">
          {/* Like */}
          <Link to="/" className="action-btn">
            <Icons.LinkHandler className="icon__base mr-2 fill-current" />
            <span>{count.postLike}</span>
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
}

export default TabTrendingPostsItem;

TabTrendingPostsItem.Skeleton = function Skeleton() {
  // generate skeleton with tailwindcss
  return (
    <div className="tab-trending-post-item">
      {/* Thubmnail */}
      <div className="mr-3">
        <div className="user-profile-image">
          <div className="h-full w-full">
            <div className="image-wrapper">
              <img
                src="/images/default_profile.png"
                className="scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"
                alt="thumbnail"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="title rounded bg-gray-200">
          <a
            href="#"
            className="block h-4 w-full scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"
          >
            Title
          </a>
        </h3>
        <p className="description rounded bg-gray-200">
          <a
            href="#"
            className="block h-4 w-full scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"
          >
            Description
          </a>
        </p>
        <div className="footer">
          {/* Like */}
          <div className="action-btn">
            <Icons.LinkHandler className="icon__base mr-2 fill-current" />
            <span className="h-4 w-4 scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"></span>
          </div>
          {/* Comment */}
          <div className="action-btn">
            <Icons.Comment className="icon__base mr-2 fill-current" />
            <span className="h-4 w-4 scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
