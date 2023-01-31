import React from "react";
import TrendingPostBox from "~/components/ui/main/TrendingPostBox";
import OtherBox from "~/components/ui/main/OtherBox";

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="container">
        <TrendingPostBox />
        <OtherBox />
      </div>
    </aside>
  );
};

export default RightSidebar;
