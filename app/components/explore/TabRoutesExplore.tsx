import { useLocation } from "@remix-run/react";
import React from "react";
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
          path="/explore"
        />
        <TabExploreButton
          id="explore-tags-tab"
          label="Tags"
          currentPathname={location.pathname}
          path="/explore/tags"
        />
        <TabExploreButton
          id="explore-posts-tab"
          label="Posts"
          currentPathname={location.pathname}
          path="/explore/posts"
        />
      </div>
      <div
        className="explore-tab-content"
        id="tabpanel-post"
        aria-labelledby={(function () {
          if (location.pathname === "/explore") {
            return "explore-trending-tab";
          } else if (location.pathname === "/explore/tags") {
            return "explore-tags-tab";
          } else if (location.pathname === "/explore/posts") {
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
