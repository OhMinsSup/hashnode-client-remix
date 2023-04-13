import { useLocation } from "@remix-run/react";
import React from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import TabExploreButton from "./TabExploreButton";

interface TabRoutesExploreProps {
  children: React.ReactNode;
}

function TabRoutesExplore({ children }: TabRoutesExploreProps) {
  const location = useLocation();
  return (
    <div className="explore">
      <div className="explore-tab-area">
        <TabExploreButton
          id="explore-trending-tab"
          label="Trending"
          currentPathname={location.pathname}
          path={PAGE_ENDPOINTS.EXPLORE.ROOT}
        />
        <TabExploreButton
          id="explore-tags-tab"
          label="Tags"
          currentPathname={location.pathname}
          path={PAGE_ENDPOINTS.EXPLORE.TAGS}
        />
        <TabExploreButton
          id="explore-posts-tab"
          label="Posts"
          currentPathname={location.pathname}
          path={PAGE_ENDPOINTS.EXPLORE.POSTS}
        />
      </div>
      <div
        className="explore-tab-content"
        id="tabpanel-post"
        aria-labelledby={(function () {
          if (location.pathname === PAGE_ENDPOINTS.EXPLORE.ROOT) {
            return "explore-trending-tab";
          } else if (location.pathname === PAGE_ENDPOINTS.EXPLORE.TAGS) {
            return "explore-tags-tab";
          } else if (location.pathname === PAGE_ENDPOINTS.EXPLORE.POSTS) {
            return "explore-posts-tab";
          } else {
            return "explore-trending-tab";
          }
        })()}
        role="tabpanel"
      >
        {children}
      </div>
    </div>
  );
}

export default TabRoutesExplore;
