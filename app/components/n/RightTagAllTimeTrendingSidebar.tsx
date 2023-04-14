import React from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import RightSidebarContentBox from "../home/RightSidebarContentBox";
import RightTagTrendingItem from "./RightTagTrendingItem";

function RightTagAllTimeTrendingSidebar() {
  return (
    <RightSidebarContentBox
      title="Trending All-time"
      to={PAGE_ENDPOINTS.EXPLORE.TAGS}
      toText="All tags"
    >
      <div>
        <RightTagTrendingItem />
        <RightTagTrendingItem />
        <RightTagTrendingItem />
        <RightTagTrendingItem />
        <RightTagTrendingItem />
      </div>
    </RightSidebarContentBox>
  );
}

export default RightTagAllTimeTrendingSidebar;
