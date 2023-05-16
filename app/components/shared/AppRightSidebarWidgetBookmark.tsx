import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { GetWidgetBookmarkRespSchema } from "~/api/schema/resp";

interface AppRightSidebarWidgetBookmarkProps {
  bookmark: GetWidgetBookmarkRespSchema;
  index: number;
}

export default function AppRightSidebarWidgetBookmark({
  index,
  bookmark,
}: AppRightSidebarWidgetBookmarkProps) {
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
