import React from "react";
import { useMedia } from "react-use";
import { TrendingPostBox, OtherBox } from "../_components";

const RightSidebar = () => {
  const isLarge = useMedia("(min-width: 1024px)", false);

  if (!isLarge) return null;

  return (
    <aside className="col-span-3">
      <div className="py-5 lg:block">
        <TrendingPostBox />
        <OtherBox />
      </div>
    </aside>
  );
};

export default RightSidebar;
