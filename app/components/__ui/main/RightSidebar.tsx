import React from "react";
import TrendingPostBox from "~/components/__ui/main/TrendingPostBox";
import BookmarkBox from "~/components/__ui/main/BookmarkBox";

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
