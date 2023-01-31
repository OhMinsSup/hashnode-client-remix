import React from "react";
import TrendingPostBox from "~/components/ui/main/TrendingPostBox";
import BookmarkBox from "~/components/ui/main/BookmarkBox";

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="container">
        <TrendingPostBox />
        <BookmarkBox />
      </div>
    </aside>
  );
};

export default RightSidebar;
