import React, { useCallback, useState } from "react";

// components
import { isString } from "~/utils/assertion";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// components
import AppRightSidebarContentBox from "./AppRightSidebarContentBox";
import AppRightSidebarTabTrendingPostButton from "./AppRightSidebarTabTrendingPostButton";
import AppRightTabTrendingPostList from "./AppRightSidebarTabTrendingPostList";

export default function AppRightWidgetForTreningPost() {
  const [duration, setDuration] = useState(7);

  const onTabClick = useCallback((duration: number | string) => {
    if (isString(duration)) {
      duration = parseInt(duration);
    }
    setDuration(duration);
  }, []);

  return (
    <AppRightSidebarContentBox
      title="Trending"
      to={PAGE_ENDPOINTS.EXPLORE.ROOT}
    >
      <div
        className="tab-content__trenidng"
        role="tablist"
        aria-orientation="horizontal"
      >
        <AppRightSidebarTabTrendingPostButton
          label="1 week"
          duration={7}
          currentDuration={duration}
          id={"tabs-trending-duration-7"}
          onTabClick={onTabClick}
        />
        <AppRightSidebarTabTrendingPostButton
          label="1 months"
          duration={30}
          currentDuration={duration}
          id={"tabs-trending-duration-30"}
          onTabClick={onTabClick}
        />
        <AppRightSidebarTabTrendingPostButton
          label="3 months"
          duration={90}
          currentDuration={duration}
          id={"tabs-trending-duration-90"}
          onTabClick={onTabClick}
        />
        <AppRightSidebarTabTrendingPostButton
          label="6 months"
          duration={180}
          currentDuration={duration}
          id={"tabs-trending-duration-180"}
          onTabClick={onTabClick}
        />
      </div>
      <div>
        <div
          tabIndex={duration === 7 ? 0 : -1}
          data-key="7"
          aria-controls="tabs-trending-duration-7"
          role="tabpanel"
        >
          <AppRightTabTrendingPostList enabled={duration === 7} duration={7} />
        </div>
        <div
          tabIndex={duration === 30 ? 0 : -1}
          data-key="30"
          aria-controls="tabs-trending-duration-30"
          role="tabpanel"
        >
          <AppRightTabTrendingPostList
            enabled={duration === 30}
            duration={30}
          />
        </div>
        <div
          tabIndex={duration === 90 ? 0 : -1}
          data-key="90"
          aria-controls="tabs-trending-duration-90"
          role="tabpanel"
        >
          <AppRightTabTrendingPostList
            enabled={duration === 90}
            duration={90}
          />
        </div>
        <div
          tabIndex={duration === 180 ? 0 : -1}
          data-key="180"
          aria-controls="tabs-trending-duration-180"
          role="tabpanel"
        >
          <AppRightTabTrendingPostList
            enabled={duration === 180}
            duration={180}
          />
        </div>
      </div>
    </AppRightSidebarContentBox>
  );
}
