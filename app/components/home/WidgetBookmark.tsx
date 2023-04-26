import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { GetWidgetBookmarkRespSchema } from "~/api/schema/resp";

interface WidgetBookmarkProps {
  bookmark: GetWidgetBookmarkRespSchema;
  index: number;
}

function WidgetBookmark({ bookmark, index }: WidgetBookmarkProps) {
  const displayDivide = useMemo(() => {
    const maxItemCount = 5;
    return index !== 0 && index <= maxItemCount;
  }, [index]);

  const to = useMemo(() => {
    return PAGE_ENDPOINTS.ITEMS.ID(bookmark.id);
  }, [bookmark.id]);

  return (
    <div>
      {displayDivide ? <hr className="custom-divide__tab-treding" /> : null}
      <div>
        <h3 className="bookmark-desc">
          <Link to={to}>{bookmark.title}</Link>
        </h3>
        <p className="username">
          <Link to={to} aria-label="Post info">
            {bookmark.user.username}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default WidgetBookmark;

WidgetBookmark.Skeleton = function WidgetBookmarkSkeleton({
  index,
}: Pick<WidgetBookmarkProps, "index">) {
  const displayDivide = useMemo(() => {
    const maxItemCount = 5;
    return index !== 0 && index <= maxItemCount;
  }, [index]);
  return (
    <div>
      {displayDivide ? <hr className="custom-divide__tab-treding" /> : null}
      <div>
        <h3 className="bookmark-desc">
          <Link
            to="/"
            className="block h-4 w-32 rounded-full border bg-gray-200 !text-transparent"
          >
            Loading...
          </Link>
        </h3>
        <p className="username">
          <Link
            to="/"
            aria-label="Post info"
            className="block  h-4 w-52 rounded-full border bg-gray-200 !text-transparent"
          >
            Loading...
          </Link>
        </p>
      </div>
    </div>
  );
};
