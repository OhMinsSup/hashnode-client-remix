import React from "react";
import { useMedia } from "react-use";
import { TrendingPostBox } from "../_components";

const RightSidebar = () => {
  const isLarge = useMedia("(min-width: 1024px)", false);
  console.log("isLarge", isLarge);

  if (!isLarge) return null;

  return (
    <aside className="col-span-3">
      <div className="py-5 lg:block">
        {/* X close button ??? */}
        <TrendingPostBox />
      </div>
    </aside>
  );
};

export default RightSidebar;
