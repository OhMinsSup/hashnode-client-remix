import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { CommentIcon, LikeIcon } from "../ui/Icon";

import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface TrendingSimplePostItemProps extends PostDetailRespSchema {}

const TrendingSimplePostItem: React.FC<TrendingSimplePostItemProps> = ({
  id,
  title,
  subTitle,
  user,
}) => {
  const avatarUrl = useMemo(() => {
    return user?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [user]);

  return (
    <div className="flex flex-row items-start py-2">
      {/* Thubmnail */}
      <div className="mr-3">
        <Link
          to={PAGE_ENDPOINTS.ITEMS.ID(id)}
          className="block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border"
        >
          <div className="h-full w-full">
            <div className="relative h-full w-full rounded-full bg-gray-100">
              <img
                src={avatarUrl}
                data-src={avatarUrl}
                className="lazyload blur-up h-full w-full object-cover"
                alt="thumbnail"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className="mb-1 font-bold text-gray-900"
          style={{ lineHeight: "1.375" }}
        >
          <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)}>{title}</Link>
        </h3>
        <p className="mb-2 text-gray-500">
          <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)}>{subTitle}</Link>
        </p>
        <div className="flex flex-row flex-wrap items-center">
          {/* Like */}
          <Link
            to="/"
            className="mr-4 flex flex-row items-center text-base font-medium text-gray-500"
          >
            <LikeIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
            <span>66</span>
          </Link>
          {/* Comment */}
          <Link
            to="/"
            className="mr-4 flex flex-row items-center text-base font-medium text-gray-500"
          >
            <CommentIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
            <span>6</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingSimplePostItem;
